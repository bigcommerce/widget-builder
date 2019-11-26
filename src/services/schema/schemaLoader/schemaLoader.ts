import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export function handleSchemaLoader(error: Error | null, schemaData: string): FileLoaderResponse {
    const payload = {
        type: WidgetFileType.SCHEMA,
        data: '',
    };

    if (schemaData && !error) {
        payload.data = schemaData;
    }

    return payload;
}

export default function schemaLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.SCHEMA}`,
            'utf8',
            (error: Error, schemaData: string) => {
                const schemaResults = handleSchemaLoader(error, schemaData);

                if (!schemaResults.data) {
                    reject(messages.invalidSchema());
                }

                resolve(schemaResults);
            },
        );
    });
}
