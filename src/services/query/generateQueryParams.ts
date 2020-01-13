import { log, messages } from '../../messages';
import { FileLoaderResponse } from '../../types';
import widgetConfigLoader from '../widgetConfig/widgetConfigLoader/widgetConfigLoader';

import queryLoader from './queryLoader/queryLoader';
import queryParamsBuilderLoader from './queryParamsBuilderLoader/queryParamsBuilderLoader';
import QueryParamFactory from './queryParamsWriter/queryParamFactory';
import queryParamsWriter from './queryParamsWriter/queryParamsWriter';

export default function generateQueryParams(directory: string) {
    return new Promise((resolve) => {
        Promise.all([
            queryLoader(directory),
            queryParamsBuilderLoader(directory),
            widgetConfigLoader(directory),
        ]).then(([
            { data: queryData },
            { data: queryParamsBuilderData },
            { data: widgetConfigData },
        ]: FileLoaderResponse[]) => {
            log.info(messages.generateQueryParams());
            const queryParams = new QueryParamFactory(
                queryData,
                JSON.parse(queryParamsBuilderData),
                JSON.parse(widgetConfigData),
            ).render();
            const queryParamsJson = JSON.stringify(
                queryParams, null, 2,
            );
            queryParamsWriter(directory, queryParamsJson).then(() => {
                log.info(messages.queryParamsWritten());
                resolve();
            });
        }).catch((error: string) => {
            log.error(error);
        });
    });
}
