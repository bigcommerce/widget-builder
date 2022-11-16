import Axios, { AxiosResponse } from 'axios';

import AUTH_CONFIG from '../auth/authConfig';
import { WidgetConfiguration } from '../schema/schemaParser/schemaParser';

export const widgetApi = {
    widgetPreviewRender: `${AUTH_CONFIG.apiPath}/content/widget-templates/preview`,
    widgetTemplatePublish: `${AUTH_CONFIG.apiPath}/content/widget-templates`,
    widgetTemplateList: `${AUTH_CONFIG.apiPath}/content/widget-templates`,
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
    schema_translations?: string;
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

export const getWidgetTemplate = (
    name: string
): Promise<string> => new Promise((resolve, reject) => 
    getAllTemplates()
        .then((data) => {
            const match = data.find(
                template => name === template.name,
              );
            
            resolve(match?.uuid || '');
        })
        .catch(error => reject(error)))

export interface WidgetTemplateResult {
    name: string;
    schema: any[];
    template: string;
    storefront_api_query: string;
    uuid: string;
    kind: string;
    date_created: string;
    date_modified: string;
    current_version_uuid: string;
    icon_name: string;
  }

const getAllTemplates = async (page: number = 1): Promise<WidgetTemplateResult[]> => {
    let listResults: WidgetTemplateResult[] = [];
    let done = false;

    while (!done) {
        const { data } = (await Axios({
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Client': AUTH_CONFIG.authId,
                'X-Auth-Token': AUTH_CONFIG.authToken,
            },
            url: `${widgetApi.widgetTemplateList}?limit=250&page=${page}`,
        })).data;

        done = data.length === 0;
        page++;
        listResults = listResults.concat(data);
    }

    return listResults;
}
