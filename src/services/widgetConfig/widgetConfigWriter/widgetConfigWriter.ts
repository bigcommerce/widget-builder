import * as fs from 'fs';

import WidgetFileType from '../../../types';
import { messages } from '../../../messages';

export default function widgetConfigWriter(widgetDir: string, data: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            `${widgetDir}/${WidgetFileType.CONFIGURATION}`,
            data,
            (error: Error) => {
                if (error) {
                    return reject(messages.configWriteError());
                }
                return resolve();
            },
        );
    });
}
