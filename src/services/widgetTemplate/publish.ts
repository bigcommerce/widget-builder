import { log, messages } from '../../messages';
import queryLoader from '../query/queryLoader/queryLoader';
import queryParamsLoader from '../query/queryParamsLoader/queryParamsLoader';
import { publishWidget } from '../api/widget';
import WidgetFileType, { FileLoaderResponse } from '../../types';
import schemaLoader from '../schema/schemaLoader/schemaLoader';

import twProcessor, { TailwindOptions } from './twProcessor';
import widgetTemplateLoader from './widgetTemplateLoader/widgetTemplateLoader';
import track from './track';


interface CreateWidgetTemplateReq {
    name: string;
    schema: object;
    template: string;
    storefront_api_query: string;
    channel_id: number;
}


const channelId = process.env.WIDGET_BUILDER_CHANNEL_ID ? parseInt(process.env.WIDGET_BUILDER_CHANNEL_ID, 10) : 1;

const widgetTemplatePayload = (widgetName: string): CreateWidgetTemplateReq => ({
    name: widgetName,
    schema: [],
    template: '',
    storefront_api_query: '',
    channel_id: channelId,
});

const publishWidgetTemplate = async (widgetName: string, widgetTemplateDir: string, twOptions: TailwindOptions = {}) => {
    const widgetTemplateUuid = track.isTracked(widgetTemplateDir);

    try {
        const styles = await twProcessor(widgetTemplateDir, twOptions);
        const widgetConfiguration = await Promise.all([
            widgetTemplateLoader(widgetTemplateDir),
            schemaLoader(widgetTemplateDir),
            queryLoader(widgetTemplateDir),
            queryParamsLoader(widgetTemplateDir),
        ]).then((results) => results.reduce((acc: CreateWidgetTemplateReq, current: FileLoaderResponse): CreateWidgetTemplateReq => {
            const { data, type } = current;

            if (type === WidgetFileType.TEMPLATE) {
                const template = `<style>${styles}</style>${data}`;
                return { ...acc, template };
            }

            if (type === WidgetFileType.SCHEMA) {
                return { ...acc, schema: JSON.parse(data) };
            }

            if (type === WidgetFileType.QUERY) {
                return { ...acc, storefront_api_query: data };
            }

            return acc;
        }, widgetTemplatePayload(widgetName)));

        const { uuid } = await publishWidget(widgetConfiguration, widgetTemplateUuid);

        if (!widgetTemplateUuid) {
            track.startTracking(widgetTemplateDir, uuid);
            log.success(messages.widgetRelease.success(widgetName));
        } else {
            log.success(`Successfully updated ${widgetName}`);
        }
    } catch (e: unknown) {
        console.log(e);
        if (e instanceof Error) {
            log.error(e.message);
        } else {
            log.error(messages.widgetRelease.failure);
        }
        log.error(messages.widgetRelease.failure);
    }
};

export default publishWidgetTemplate;
