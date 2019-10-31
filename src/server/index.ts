#!/usr/bin/env node

import { createServer } from 'http';
import path from 'path';

import chokidar from 'chokidar';
import express from 'express';
import open from 'open';
import { Socket } from 'socket.io';

import { host, port } from '../config';
import { AUTH_CONFIG, checkCredentials } from '../services/auth/const';
import { SocketData } from '../sharedUtils';

import getWidgetHtml from './controllers/widgetController';

const widgetDir = path.resolve('.');

if (!checkCredentials(AUTH_CONFIG)) {
    process.exit(1);
}

function sendWidgetHtml(directory: string, sockets: Socket[], event: string, eventPath: string) {
    getWidgetHtml(directory).then((html: string) => {
        const socketData: SocketData = { event, html, path: eventPath };
        sockets.forEach((socket) => {
            socket.emit('event', socketData);
        });
    });
}

function watchFiles(directory: string, sockets: Socket[]) {
    chokidar.watch(directory).on('all', (event, eventPath) => {
        sendWidgetHtml(directory, sockets, event, eventPath);
    });
}

function initServer(directory: string) {
    const app = express();
    const server = createServer(app);
    const io = require('socket.io')(server);
    const sockets: Socket[] = [];

    app.use(express.static(path.join(__dirname, '../', 'client')));

    io.on('connection', (socket: Socket) => {
        console.log('Socket connected');
        const index = sockets.push(socket);

        sendWidgetHtml(directory, [socket], 'initialize', '');

        socket.on('disconnect', () => {
            sockets.splice(index - 1, 1);
        });
    });

    const serverInitCallback = () => (): void => {
        console.log(`Listening on port ${port}!`);
        open(`${host}:${port}`);
    };

    server.listen(port, serverInitCallback());
    watchFiles(directory, sockets);
}

initServer(widgetDir);
