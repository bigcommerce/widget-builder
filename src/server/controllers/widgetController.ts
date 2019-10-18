import uuid from 'uuid';
import { Request, Response } from 'express';

import { widgetTemplateLoader } from '../../services/widgetTemplate/widgetTemplate';
import { widgetConfigLoader } from '../../services/widgetConfig/widgetConfig';
import { getWidget, WidgetPreviewRenderRequest } from '../../services/api/widget';


export enum WidgetFileType {
    WIDGET_TEMPLATE_HTML = 'widget.html',
    WIDGET_CONFIGURATION = 'config.json',
    WIDGET_SCHEMA = 'schema.json',
}

export interface FileLoaderResponse {
    type: WidgetFileType;
    data: string;
}

const getInitialRenderingPayload = (): WidgetPreviewRenderRequest => ({
    widget_configuration: {},
    widget_template: '',
    placement_uuid: uuid(),
    widget_uuid: uuid(),
    storefront_api_query: '',
    storefront_api_query_params: {},
});

const generateRenderPayloadFromFileLoaderResults = (results: FileLoaderResponse[]): WidgetPreviewRenderRequest => results.reduce(
    (acc: WidgetPreviewRenderRequest, current: FileLoaderResponse): WidgetPreviewRenderRequest => {
        const { data, type } = current;

        if (type === WidgetFileType.WIDGET_TEMPLATE_HTML) {
            return { ...acc, widget_template: data };
        }

        if (type === WidgetFileType.WIDGET_CONFIGURATION) {
            return { ...acc, widget_configuration: JSON.parse(data) };
        }

        return acc;
    }, getInitialRenderingPayload(),
);

export const getWidgetEndpoint = (widgetDir: string) => (_: Request, res: Response) => {
    Promise.all([widgetTemplateLoader(widgetDir), widgetConfigLoader(widgetDir)])
        .then((results: FileLoaderResponse[]) => {
            return getWidget(generateRenderPayloadFromFileLoaderResults(results))
                .then((data: string) => { res.send(data); });
        }).catch((err: Error) => console.log(err));
};
