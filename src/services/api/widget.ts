import Axios, { AxiosResponse } from 'axios';

import AUTH_CONFIG from '../auth/authConfig';

export const API_GATEWAY_BASE = process.env.WIDGET_BUILDER_API_GATEWAY_BASE || 'https://api.bigcommerce.com';

export const widgetApi = {
    widgetPreviewRender:
        (storeHash: string): string => `${API_GATEWAY_BASE}/stores/${storeHash}/v3/content/widget-templates/preview`,
};

interface WidgetPreviewRenderResponse {
    data: {
        html: string;
    };
}

export interface WidgetPreviewRenderRequest {
    widget_configuration: object;
    widget_template: string;
    placement_uuid: string;
    widget_uuid: string;
    storefront_api_query: string;
    storefront_api_query_params: object;
    channel_id: number;
}

export function getWidget(data: WidgetPreviewRenderRequest): Promise<string> {
    return new Promise((resolve, reject) => {
        Axios({
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Client': AUTH_CONFIG.authId,
                'X-Auth-Token': AUTH_CONFIG.authToken,
            },
            data,
            url: widgetApi.widgetPreviewRender(AUTH_CONFIG.storeHash as string),
        }).then(({ data: { data: { html } } }: AxiosResponse<WidgetPreviewRenderResponse>) => {
            resolve(html);
        }).catch((err: Error) => reject(err));
    });
}
