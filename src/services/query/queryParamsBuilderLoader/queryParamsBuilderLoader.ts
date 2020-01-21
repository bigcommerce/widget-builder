import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export default function queryParamsBuilderLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.QUERY_PARAMS_BUILDER}`,
            'utf8',
            (error: Error, data: string) => {
                if (!data || error) {
                    reject(messages.invalidQueryParamsBuilder());
                }

                resolve({
                    type: WidgetFileType.QUERY_PARAMS_BUILDER,
                    data,
                });
            },
        );
    });
}
