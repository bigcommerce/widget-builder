import uuid from 'uuid';

import { getWidget, WidgetPreviewRenderRequest } from '../api/widget';
import WidgetFileType, { FileLoaderResponse } from '../../types';
import widgetTemplateLoader from '../widgetTemplate/widgetTemplateLoader/widgetTemplateLoader';
import widgetConfigLoader from '../widgetConfig/widgetConfigLoader/widgetConfigLoader';

const getInitialRenderingPayload = (): WidgetPreviewRenderRequest => ({
    widget_configuration: {},
    widget_template: '',
    placement_uuid: uuid(),
    widget_uuid: uuid(),
    storefront_api_query: '',
    storefront_api_query_params: {},
});

export function generateRenderPayloadFromFileLoaderResults(results: FileLoaderResponse[]): WidgetPreviewRenderRequest {
    return results.reduce(
        (acc: WidgetPreviewRenderRequest, current: FileLoaderResponse): WidgetPreviewRenderRequest => {
            const { data, type } = current;

            if (type === WidgetFileType.TEMPLATE) {
                return { ...acc, widget_template: data };
            }

            if (type === WidgetFileType.CONFIGURATION) {
                return { ...acc, widget_configuration: JSON.parse(data) };
            }

            return acc;
        }, getInitialRenderingPayload(),
    );
}

export default function renderWidget(widgetDir: string): Promise<string> {
    return Promise.all([
        widgetTemplateLoader(widgetDir),
        widgetConfigLoader(widgetDir),
    ]).then(
        (results: FileLoaderResponse[]) => getWidget(
            generateRenderPayloadFromFileLoaderResults(results),
        ),
    );
}
