import express from 'express';
import open from 'open';

import { AUTH_CONFIG, checkCredentials } from '../services/auth/const';

import { ROUTES } from './const';
import { getWidgetEndpoint } from './controllers/widgetController';

const serverInitCallback = (port: string) => (): void => {
    console.log(`Listening on port ${port}!`);
    open(`http://localhost:${port}${ROUTES.GET_WIDGET}`);
};

export const initServer = (widgetDir: string): void => {
    if (!checkCredentials(AUTH_CONFIG)) {
        process.exit(1);
    }

    const apiServer = express();
    const port: string = process.env.PORT || '8080';

    apiServer.use(express.static('dist'));
    apiServer.get(ROUTES.GET_WIDGET, getWidgetEndpoint(widgetDir));
    apiServer.listen(port, serverInitCallback(port));
};
