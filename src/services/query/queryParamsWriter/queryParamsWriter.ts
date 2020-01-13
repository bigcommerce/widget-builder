import * as fs from 'fs';

import WidgetFileType from '../../../types';
import { messages } from '../../../messages';

export default function queryParamsWriter(widgetDir: string, data: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            `${widgetDir}/${WidgetFileType.QUERY_PARAMS}`,
            data,
            (error: Error) => {
                if (error) {
                    return reject(messages.queryParamsWriteError());
                }
                return resolve();
            },
        );
    });
}
