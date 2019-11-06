import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export default function widgetTemplateLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.TEMPLATE}`,
            'utf8',
            (err: Error, data: string) => {
                if (!data || err) {
                    reject(messages.invalidWidgetTemplate());
                }

                resolve({ type: WidgetFileType.TEMPLATE, data });
            },
        );
    });
}
