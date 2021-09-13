import * as fs from 'fs';

import WidgetFileType from '../../../types';
import { messages } from '../../../messages';


function callback(error: Error, resolve: (value?: unknown) => void, reject: (value?: unknown) => void) {
    if (error) {
        return reject(messages.queryParamsWriteError());
    }
    return resolve();
}

export default function queryParamsWriter(widgetDir: string, data: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            `${widgetDir}/${WidgetFileType.QUERY_PARAMS}`,
            data,
            (error: Error) => callback(error, resolve, reject),
        );
    });
}
