import path from 'path';
import { existsSync } from 'fs';

import { log, messages } from '../../messages';
import queryLoader from '../query/queryLoader/queryLoader';
import queryParamsLoader from '../query/queryParamsLoader/queryParamsLoader';
import { publishWidget } from '../api/widget';
import WidgetFileType, { FileLoaderResponse } from '../../types';
import schemaLoader from '../schema/schemaLoader/schemaLoader';

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
            schemaLoader(widgetTemplateDir),
            queryLoader(widgetTemplateDir),
            queryParamsLoader(widgetTemplateDir),
        ]).then(results => results.reduce(
            (acc: CreateWidgetTemplateReq, current: FileLoaderResponse): CreateWidgetTemplateReq => {
                const { data, type } = current;

                if (type === WidgetFileType.TEMPLATE) {
                    return { ...acc, template: data.replace(/\r\n|\r|\\n/gm, '') };
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

        const { date_created: dateCreated } = await publishWidget(widgetConfiguration);

        log.success(messages.widgetRelease.success(dateCreated, widgetName));
    } catch {
        log.error(messages.widgetRelease.failure);
    }
};


export default publishWidgetTemplate;
