import { log, messages } from '../../messages';
import queryLoader from '../query/queryLoader/queryLoader';
import queryParamsLoader from '../query/queryParamsLoader/queryParamsLoader';
import { publishWidget } from '../api/widget';
import WidgetFileType, { FileLoaderResponse } from '../../types';
import schemaLoader from '../schema/schemaLoader/schemaLoader';

import widgetTemplateLoader from './widgetTemplateLoader/widgetTemplateLoader';
import track from './track';

interface CreateWidgetTemplateReq {
    name: string;
    schema: object;
    template: string;
    storefront_api_query: string;
    channel_id: number;
}

const widgetTemplatePayload = (widgetName: string): CreateWidgetTemplateReq => ({
    name: widgetName,
    schema: [],
    template: '',
    storefront_api_query: '',
    channel_id: 1,
});

const publishWidgetTemplate = async (widgetName: string, widgetTemplateDir: string) => {
    const widgetTemplateUuid = track.isTracked(widgetTemplateDir);

    try {
        const widgetConfiguration = await Promise.all([
            widgetTemplateLoader(widgetTemplateDir),
            schemaLoader(widgetTemplateDir),
            queryLoader(widgetTemplateDir),
            queryParamsLoader(widgetTemplateDir),
        ]).then(results => results.reduce(
            (acc: CreateWidgetTemplateReq, current: FileLoaderResponse): CreateWidgetTemplateReq => {
                const { data, type } = current;

                if (type === WidgetFileType.TEMPLATE) {
                    return { ...acc, template: data };
                }

                if (type === WidgetFileType.SCHEMA) {
                    return { ...acc, schema: JSON.parse(data) };
                }

                if (type === WidgetFileType.QUERY) {
                    return { ...acc, storefront_api_query: data };
                }

                return acc;
            }, widgetTemplatePayload(widgetName),
        ));

        const { uuid } = await publishWidget(widgetConfiguration, widgetTemplateUuid);

        if (!widgetTemplateUuid) {
            track.startTracking(widgetTemplateDir, uuid);
            log.success(messages.widgetRelease.success(widgetName));
        } else {
            log.success(`Successfully updated ${widgetName}`);
        }
    } catch {
        log.error(messages.widgetRelease.failure);
    }
};


export default publishWidgetTemplate;
