import React, { Component, createRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {
    Flex,
    GlobalStyles,
    H1,
} from '@bigcommerce/big-design';

import { host, port } from '../../../config';
import { createElementFromHTML, executeWidgetScripts } from '../../utils/widget';
import { SocketData } from '../../../types';

export class App extends Component<{}, {}> {
    private widgetFrameRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

    socket?: Socket;

    componentDidMount() {
        this.socket = io(`${host}:${port}`);

        this.socket.on('connect', () => console.log('Socket connected')); // eslint-disable-line no-console
        this.socket.on('event', (data: SocketData) => {
            this.mountWidget(data.html);
        });
        this.socket.on('disconnect', () => {
            this.socket = undefined;
        });
    }

    mountWidget(html: string) {
        const widgetFrame = this.widgetFrameRef.current as HTMLDivElement;

        while (widgetFrame.firstChild) {
            widgetFrame.removeChild(widgetFrame.firstChild);
        }
        const widgetElement = createElementFromHTML(html);
        widgetFrame.appendChild(widgetElement);
        executeWidgetScripts(widgetElement, document);
    }

    render() {
        return (
            <div>
                <GlobalStyles/>
                <Flex
                    alignContent={'center'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    padding={'medium'}
                >
                    <img
                        src={'favicon.ico'}
                        height={34}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <H1>Widget Builder</H1>
                </Flex>
                <div ref={this.widgetFrameRef}></div>
            </div>
        );
    }
}

export default App;
