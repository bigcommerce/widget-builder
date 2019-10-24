import uuid from 'uuid';

import { FileLoaderResponse, WidgetFileType } from '../const';
import widgetTemplateLoader from '../../services/widgetTemplate/widgetTemplate';
import widgetConfigLoader from '../../services/widgetConfig/widgetConfig';
import { getWidget, WidgetPreviewRenderRequest } from '../../services/api/widget';

const getInitialRenderingPayload = (): WidgetPreviewRenderRequest => ({
    widget_configuration: {},
    widget_template: '',
    placement_uuid: uuid(),
    widget_uuid: uuid(),
    storefront_api_query: '',
    storefront_api_query_params: {},
});

function generateRenderPayloadFromFileLoaderResults(results: FileLoaderResponse[]): WidgetPreviewRenderRequest {
    return results.reduce(
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
}

export default function getWidgetHtml(widgetDir: string) {
    return Promise.all([widgetTemplateLoader(widgetDir), widgetConfigLoader(widgetDir)])
        .then(
            (results: FileLoaderResponse[]) => getWidget(generateRenderPayloadFromFileLoaderResults(results)),
        ).catch((err: Error) => console.log(err));
}
