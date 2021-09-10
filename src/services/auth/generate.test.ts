import { resolve } from 'path';

import { log } from '../../messages';

import generate from './generate';


const fs = require('fs');

const config = {
    clientId: 'someClientId',
    accessToken: 'sometokenvalue',
    apiPath: 'https://api.bigcommerce.com/stores/storeHash/v3/',
};

const configuration = `
WIDGET_BUILDER_AUTH_ID=${config.clientId}
WIDGET_BUILDER_AUTH_TOKEN=${config.accessToken}
WIDGET_BUILDER_CHANNEL_ID=1
WIDGET_BUILDER_API_GATEWAY_BASE=${config.apiPath.replace(/\/$/, '')}
`;


describe('generate config', () => {
    it('should write .env file', () => {
        const writeFileStub = jest.spyOn(fs, 'writeFileSync').mockImplementation(jest.fn());
        const successLogStub = jest.spyOn(log, 'success').mockImplementation(jest.fn());

        generate.configurations(config);

        expect(writeFileStub).toHaveBeenCalledTimes(1);
        expect(writeFileStub).toBeCalledWith(`${resolve('.')}/.env`, configuration);
        expect(successLogStub).toHaveBeenCalledTimes(1);
    });
});
