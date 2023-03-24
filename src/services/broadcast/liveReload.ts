import { Socket } from 'socket.io';

import { log, messages } from '../../messages';
import generateQueryParams from '../query/generateQueryParams';
import renderWidget from '../widgetRenderer/widgetRenderer';

import broadcastToSockets from './broadcastToSockets';

interface WidgetChangeBroadcast {
    directory: string;
    sockets: Socket[];
    fileEvent: string;
    filePath: string;
    themeHost: string;
}

export interface Options {
    genConfig?: boolean;
    genQueryParams?: boolean;
    autoOpen?: boolean;
}

interface LiveReloadPayload extends WidgetChangeBroadcast {
    options?: Options;
}

const broadcastWidgetChange = ({
    directory, sockets, fileEvent, filePath, themeHost,
}: WidgetChangeBroadcast) => {
    renderWidget(directory)
        .then((html: string) => {
            broadcastToSockets({
                sockets,
                data: {
                    event: fileEvent,
                    html,
                    path: filePath,
                    themeHost,
                },
            });
            log.info(messages.rerenderWidget());
        })
        .catch((error: string) => {
            log.error(error);
        });
};

export default function liveReload({
    directory, sockets, fileEvent, filePath, options, themeHost,
}: LiveReloadPayload) {
    if (options && options.genQueryParams) {
        generateQueryParams(directory)
            .then(() => {
                broadcastWidgetChange({
                    directory, sockets, fileEvent, filePath, themeHost,
                });
            });

        return;
    }

    broadcastWidgetChange({
        directory, sockets, fileEvent, filePath, themeHost,
    });
}
