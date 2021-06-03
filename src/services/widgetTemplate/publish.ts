import path from 'path';
import { existsSync } from 'fs';

import { log, messages } from '../../messages';
import widgetConfigLoader from '../widgetConfig/widgetConfigLoader/widgetConfigLoader';
import queryLoader from '../query/queryLoader/queryLoader';
import queryParamsLoader from '../query/queryParamsLoader/queryParamsLoader';
import { releaseWidget } from '../api/widget';
import WidgetFileType, { FileLoaderResponse } from '../../types';
import AUTH_CONFIG from '../auth/authConfig';

import widgetTemplateLoader from './widgetTemplateLoader/widgetTemplateLoader';

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

const publishWidgetTemplate = async (widgetName: string) => {
    const widgetTemplateDir = path.resolve(`./${widgetName}`);

    if (!existsSync(widgetTemplateDir)) {
        log.error('Widget Template doesn\'t exist');
        return;
    }

    try {
        const widgetConfiguration = await Promise.all([
            widgetTemplateLoader(widgetTemplateDir),
            widgetConfigLoader(widgetTemplateDir),
            queryLoader(widgetTemplateDir),
            queryParamsLoader(widgetTemplateDir),
        ]).then(results => results.reduce(
            (acc: CreateWidgetTemplateReq, current: FileLoaderResponse): CreateWidgetTemplateReq => {
                const { data, type } = current;

                if (type === WidgetFileType.TEMPLATE) {
                    return { ...acc, template: data };
                }

                if (type === WidgetFileType.CONFIGURATION) {
                    return { ...acc, schema: JSON.parse(data) };
                }

                if (type === WidgetFileType.QUERY) {
                    return { ...acc, storefront_api_query: data };
                }

                return acc;
            }, widgetTemplatePayload(widgetName),
        ));

        const { date_created: dateCreated } = await releaseWidget(widgetConfiguration);

        log.success(messages.widgetRelease.success(dateCreated, AUTH_CONFIG.storeHash, widgetName));
    } catch {
        log.error(messages.widgetRelease.failure);
    }
};


export default publishWidgetTemplate;
