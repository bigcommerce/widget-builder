import Axios, { AxiosResponse } from 'axios';

import AUTH_CONFIG from '../auth/authConfig';
import { WidgetConfiguration } from '../schema/schemaParser/schemaParser';

export const widgetApi = {
    widgetPreviewRender: `${AUTH_CONFIG.apiPath}/content/widget-templates/preview`,
    widgetTemplatePublish: `${AUTH_CONFIG.apiPath}/content/widget-templates`,
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
            url: widgetApi.widgetPreviewRender,
        }).then(({ data: { data: { html } } }: AxiosResponse<WidgetPreviewRenderResponse>) => {
            resolve(html);
        }).catch((err: Error) => reject(err));
    });
}

interface PublishWidetResponse {
    uuid: string;
}

export const publishWidget = (
    widgetData: WidgetConfiguration,
    uuid: string | null,
): Promise<PublishWidetResponse> => new Promise((resolve, reject) => {
    Axios({
        method: uuid ? 'put' : 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Client': AUTH_CONFIG.authId,
            'X-Auth-Token': AUTH_CONFIG.authToken,
        },
        data: widgetData,
        url: `${widgetApi.widgetTemplatePublish}${uuid ? `/${uuid}` : ''}`,
    })
        .then(({ data: { data } }) => resolve(data))
        .catch(error => reject(error));
});
