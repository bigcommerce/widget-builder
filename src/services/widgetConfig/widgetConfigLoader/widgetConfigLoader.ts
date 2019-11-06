import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export default function widgetConfigLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.CONFIGURATION}`,
            'utf8',
            (error: Error, data: string) => {
                if (!data || error) {
                    reject(messages.invalidConfig());
                }

                resolve({
                    type: WidgetFileType.CONFIGURATION,
                    data,
                });
            },
        );
    });
}
