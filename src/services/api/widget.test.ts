import AUTH_CONFIG from '../auth/authConfig';

import { widgetApi } from './widget';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const { getWidget, publishWidget } = require('./widget');

const axiosMock = new MockAdapter(axios);

describe('widget API', () => {
    AUTH_CONFIG.authId = 'authId';
    AUTH_CONFIG.authToken = 'authToken';

    const request = {
        widget_configuration: { fred: 1 },
        widget_template: '<div></div>',
        placement_uuid: '12345',
        widget_uuid: '67890',
        storefront_api_query: '',
        storefront_api_query_params: {},
        channel_id: 1,
    };

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Client': 'authId',
        'X-Auth-Token': 'authToken',
    };

    describe('getWidget', () => {
        describe('when POST succeeds', () => {
            afterEach(() => {
                jest.restoreAllMocks();
                axiosMock.reset();
            });

            it('properly performs a POST request to render a widget', (done) => {
                axiosMock.onPost(widgetApi.widgetPreviewRender, request, headers)
                    .reply(200, { data: { html: 'widgetHtml' } });

                getWidget(request).then((result: any) => {
                    expect(result).toBe('widgetHtml');
                    done();
                });
            });
        });

        describe('when POST fails', () => {
            afterEach(() => {
                jest.restoreAllMocks();
                axiosMock.reset();
            });

            it('should return an error', (done) => {
                axiosMock.onPost(widgetApi.widgetPreviewRender, request, headers)
                    .reply(400);

                getWidget(request).catch((result: any) => {
                    expect(result).toEqual(new Error('Request failed with status code 400'));
                    done();
                });
            });
        });
    });

    describe('publishWidget', () => {
        describe('when POST succeeds', () => {
            afterEach(() => {
                jest.restoreAllMocks();
                axiosMock.reset();
            });

            it('should return the result of posted template', (done) => {
                const uuid = null;

                axiosMock.onPost(widgetApi.widgetTemplatePublish, request, headers)
                    .reply(200, { data: 'result' });

                publishWidget(request, uuid).then((result: any) => {
                    expect(result).toBe('result');
                    done();
                });
            });
        });

        describe('when POST fails', () => {
            afterEach(() => {
                jest.restoreAllMocks();
                axiosMock.reset();
            });

            it('should return an error', (done) => {
                axiosMock.onPost(widgetApi.widgetTemplatePublish, request, headers)
                    .reply(400);

                publishWidget(request, null).catch((result: any) => {
                    expect(result).toEqual(new Error('Request failed with status code 400'));
                    done();
                });
            });
        });
    });
});
