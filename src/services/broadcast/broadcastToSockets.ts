import { Socket } from 'socket.io';

import { SocketData } from '../../types';

interface SocketsBroadcast {
    sockets: Socket[];
    data: SocketData;
}

export default function broadcastToSockets({ sockets, data }: SocketsBroadcast) {
    sockets.forEach((socket: Socket) => socket.emit('event', data));
}
