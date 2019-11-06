import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export default function schemaLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.SCHEMA}`,
            'utf8',
            (error: Error, schemaData: string) => {
                if (!schemaData || error) {
                    reject(messages.invalidSchema());
                }

                resolve({
                    type: WidgetFileType.SCHEMA,
                    data: schemaData,
                });
            },
        );
    });
}
