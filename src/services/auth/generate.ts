#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { log } from '../../messages';

interface EnvironmentInterface {
    clientId: string;
    accessToken: string;
    apiPath: string;
}

const generateConfig = ({
    clientId, accessToken, apiPath,
}: EnvironmentInterface) => {
    const dir = resolve('.');
    const configuration = `
WIDGET_BUILDER_AUTH_ID=${clientId}
WIDGET_BUILDER_AUTH_TOKEN=${accessToken}
WIDGET_BUILDER_CHANNEL_ID=1
WIDGET_BUILDER_API_GATEWAY_BASE=${apiPath.replace(/\/$/, '')}
`;

    try {
        writeFileSync(`${dir}/.env`, configuration);
        log.success('Successfully created your configuration, you\'re all set!');
    } catch (e) {
        log.error('There seemed to be an error creating the file.');
    }
};

export default {
    configurations: generateConfig,
};
