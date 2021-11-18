import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export default function queryParamsLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.QUERY_PARAMS}`,
            'utf8',
            (error, data: string) => {
                if (error) {
                    if (error.code === 'ENOENT') {
                        resolve({
                            type: WidgetFileType.QUERY_PARAMS,
                            data: '{}',
                        });
                    } else {
                        reject(messages.invalidQueryParams());
                    }
                }

                resolve({
                    type: WidgetFileType.QUERY_PARAMS,
                    data,
                });
            },
        );
    });
}
