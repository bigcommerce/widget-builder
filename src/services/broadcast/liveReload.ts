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

export default function liveReload({
    directory, sockets, fileEvent, filePath, options,
}: LiveReloadPayload) {
    if (options && options.genQueryParams) {
        generateQueryParams(directory)
            .then(() => {
                broadcastWidgetChange({
                    directory, sockets, fileEvent, filePath,
                });
            });

        return;
    }

    broadcastWidgetChange({
        directory, sockets, fileEvent, filePath,
    });
}
