import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AUTH_CONFIG from '../auth/authConfig';

import * as widget from './widget';

const mock = new MockAdapter(axios);

describe('widget API', () => {
    afterEach(() => {
        mock.reset();
    });

    it('properly performs a POST request to render a widget', (done) => {
        AUTH_CONFIG.storeHash = 'abcdefg';
        AUTH_CONFIG.authId = 'authId';
        AUTH_CONFIG.authToken = 'authToken';

        const url = 'https://api.bigcommerce.com/stores/abcdefg/v3/content/widget-templates/preview';

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

        mock.onPost(url, request, headers).reply(200, { data: { html: 'widgetHtml' } });

        widget.getWidget(request).then((result) => {
            expect(result).toBe('widgetHtml');
            done();
        });
    });
});
