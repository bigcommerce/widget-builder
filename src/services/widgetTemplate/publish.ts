import { log, messages } from '../../messages';
import queryLoader from '../query/queryLoader/queryLoader';
import queryParamsLoader from '../query/queryParamsLoader/queryParamsLoader';
import { publishWidget, getWidgetTemplate } from '../api/widget';
import WidgetFileType, { FileLoaderResponse } from '../../types';
import schemaLoader from '../schema/schemaLoader/schemaLoader';

import widgetTemplateLoader from './widgetTemplateLoader/widgetTemplateLoader';
import translationsLoader from '../translation/translationLoader/translationLoader';

interface CreateWidgetTemplateReq {
    name: string;
    schema: object;
    template: string;
    storefront_api_query: string;
    channel_id: number;
    schema_translations?: string;
}

const widgetTemplatePayload = (widgetName: string): CreateWidgetTemplateReq => ({
    name: widgetName,
    schema: [],
    template: '',
    storefront_api_query: '',
    channel_id: 1,
    schema_translations: ''
});

const publishWidgetTemplate = async (widgetName: string, widgetTemplateDir: string) => {
    const widgetTemplateUuid = await getWidgetTemplate(widgetName);

    try {
        const widgetConfiguration = await Promise.all([
            widgetTemplateLoader(widgetTemplateDir),
            translationsLoader(widgetTemplateDir),
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

                if (type === WidgetFileType.TRANSLATION) {
                    return { ...acc, schema_translations: data };
                }

                return acc;
            }, widgetTemplatePayload(widgetName),
        ));

        await publishWidget(widgetConfiguration, widgetTemplateUuid);

        if (!widgetTemplateUuid) {
            log.success(messages.widgetRelease.success(widgetName));
        } else {
            log.success(`Successfully updated ${widgetName}`);
        }
    } catch {
        log.error(messages.widgetRelease.failure);
    }
};


export default publishWidgetTemplate;
