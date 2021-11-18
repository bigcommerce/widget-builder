import { createServer } from 'http';
import path from 'path';

import chokidar from 'chokidar';
import express from 'express';
import open from 'open';
import { Socket } from 'socket.io';

import { host, port } from '../config';
import { log, messages } from '../messages';
import liveReload, { Options } from '../services/broadcast/liveReload';
import broadcastToSockets from '../services/broadcast/broadcastToSockets';
import WidgetFileType from '../types';
import validateSchema from '../services/schema/schemaValidator/validateSchema';
import generateQueryParams from '../services/query/generateQueryParams';
import validateQueryParamsBuilder from '../services/query/queryParamsBuilderValidator/validateQueryParamsBuilder';
import renderWidget from '../services/widgetRenderer/widgetRenderer';
import generateConfig from '../services/widgetConfig/generateConfig';

const BUILDER_ADDRESS = `${host}:${port}`;

interface Watcher {
    directory: string;
    sockets: Socket[];
    options: Options;
}

function setupFileWatcher({ directory, sockets, options }: Watcher) {
    chokidar.watch(directory).on('all', (fileEvent: string, filePath: string) => {
    // We only care about change events
        if (fileEvent !== 'change') { return; }

        const fileName = path.basename(filePath);
        log.info(messages.fileChangeDetected(fileName));

        switch (fileName) {
        case WidgetFileType.TEMPLATE:
        case WidgetFileType.CONFIGURATION:
        case WidgetFileType.QUERY:
            liveReload({
                directory, sockets, fileEvent, filePath, options,
            });
            break;

        case WidgetFileType.QUERY_PARAMS_BUILDER:
            validateQueryParamsBuilder(directory);

            liveReload({
                directory, sockets, fileEvent, filePath, options,
            });
            break;

            // When the schema changes
        case WidgetFileType.SCHEMA:
            // Validate the schema against json schema
            validateSchema(directory);
            generateConfig(directory);

            liveReload({
                directory, sockets, fileEvent, filePath, options,
            });

            break;

        case WidgetFileType.META:
            // We are not currently handling this file type
            break;

        default: break;
        }
    });
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
            .catch((error) => {
                try {
                    const { message } = error.toJSON();

                    if (message.match('401')) {
                        log.error(messages.unauthorizedAccess());
                    } else {
                        log.error(messages.generalError(message));
                    }
                } catch {
                    log.error(error);
                }
            });
    });

    if (options.genQueryParams) {
        generateConfig(directory).then(() => {
            generateQueryParams(directory);
        });
    } else if (options.genConfig) {
        generateConfig(directory);
    }

    setupFileWatcher({
        directory,
        sockets,
        options,
    });
}
