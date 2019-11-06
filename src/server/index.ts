import { createServer } from 'http';
import path from 'path';

import chokidar from 'chokidar';
import express from 'express';
import open from 'open';
import { Socket } from 'socket.io';

import { host, port } from '../config';
import WidgetFileType, { FileLoaderResponse, SocketData } from '../types';
import { log, messages } from '../messages';
import schemaLoader from '../services/schema/schemaLoader/schemaLoader';
import { generateWidgetConfiguration } from '../services/schema/schemaParser/schemaParser';
import widgetConfigWriter from '../services/widgetConfig/widgetConfigWriter/widgetConfigWriter';
import SchemaValidator from '../services/schema/schemaValidator/schemaValidator';
import renderWidget from '../services/widgetRenderer/widgetRenderer';

const BUILDER_ADDRESS = `${host}:${port}`;

interface SocketsBroadcast {
    sockets: Socket[];
    data: SocketData;
}

function broadcastToSockets({ sockets, data }: SocketsBroadcast) {
    sockets.forEach((socket: Socket) => socket.emit('event', data));
}

interface Watcher {
    directory: string;
    sockets: Socket[];
    options: Options;
}

const generateConfig = (directory: string) => schemaLoader(directory).then(({ data }: FileLoaderResponse) => {
    log.info(messages.parseSchema());
    const schema = JSON.parse(data);
    const widgetConfiguration = generateWidgetConfiguration(schema);
    const widgetConfigurationJson = JSON.stringify(
        widgetConfiguration, null, 2,
    );
    widgetConfigWriter(directory, widgetConfigurationJson).then(() => {
        log.info(messages.configFileWritten());
    });
});

const schemaValidation = (directory: string) => schemaLoader(directory).then(({ data }: FileLoaderResponse) => {
    const schema = JSON.parse(data);
    const validator = new SchemaValidator(schema);
    validator.validate();
});

interface WidgetChangeBroadcast {
    directory: string;
    sockets: Socket[];
    fileEvent: string;
    filePath: string;
}

const broadcastWidgetChange = ({
    directory, sockets, fileEvent, filePath,
}: WidgetChangeBroadcast) => {
    renderWidget(directory)
        .then((html: string) => {
            broadcastToSockets({
                sockets,
                data: {
                    event: fileEvent,
                    html,
                    path: filePath,
                },
            });
            log.info(messages.rerenderWidget());
        })
        .catch((error: string) => {
            log.error(error);
        });
};

function setupFileWatcher({ directory, sockets, options }: Watcher) {
    chokidar.watch(directory).on('all', (fileEvent: string, filePath: string) => {
        // We only care about change events
        if (fileEvent !== 'change') { return; }

        const fileName = path.basename(filePath);
        log.info(messages.fileChangeDetected(fileName));

        switch (fileName) {
            // When the widget template or configuration changes, we should live reload
            case WidgetFileType.TEMPLATE:
            case WidgetFileType.CONFIGURATION:
                broadcastWidgetChange({
                    directory, sockets, fileEvent, filePath,
                });
                break;

            // When the schema changes
            case WidgetFileType.SCHEMA:
                // Validate the schema against json schema
                if (options.validateSchema) {
                    schemaValidation(directory);
                }

                // Check whether we need to regenerate a config file
                if (options.generateConfig) {
                    generateConfig(directory);
                }
                break;

            case WidgetFileType.META:
                // We are not currently handling this file type
                break;

            default:
                // Do nothing
                break;
        }
    });
}

export interface Options {
    generateConfig?: boolean;
    validateSchema?: boolean;
    autoOpen?: boolean;
}

export default function startWidgetBuilder(directory: string, options: Options) {
    const app = express();
    app.use(express.static(path.join(__dirname, '../', 'client')));

    const server = createServer(app);
    server.listen(port, () => {
        log.notice(messages.startup(BUILDER_ADDRESS));
        if (options.autoOpen) {
            open(BUILDER_ADDRESS);
        }
    });

    const sockets: Socket[] = [];
    const io = require('socket.io')(server);
    io.on('connection', (socket: Socket) => {
        const index = sockets.push(socket);
        log.debug(messages.socketConnected());

        socket.on('disconnect', () => {
            log.debug(messages.socketDisconnected());
            sockets.splice(index - 1, 1);
        });

        renderWidget(directory)
            .then((html: string) => {
                broadcastToSockets({
                    sockets: [socket],
                    data: {
                        event: 'initialize',
                        html,
                        path: '',
                    },
                });
            })
            .catch((error: string) => {
                log.error(error);
            });
    });

    if (options.generateConfig) {
        generateConfig(directory);
    }

    if (options.validateSchema) {
        schemaValidation(directory);
    }

    setupFileWatcher({
        directory,
        sockets,
        options,
    });
}
