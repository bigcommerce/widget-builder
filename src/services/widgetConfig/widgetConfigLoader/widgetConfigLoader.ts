import { readFile } from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export default function widgetConfigLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        readFile(
            `${widgetDir}/${WidgetFileType.CONFIGURATION}`,
            'utf8',
            (error: Error, data: string) => {
                if (error) {
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
