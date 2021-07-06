import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export function handleSchemaLoader(error: Error | null, schemaData: string): FileLoaderResponse {
    const payload = {
        type: WidgetFileType.TRANSLATION,
        data: '',
    };

    if (schemaData && !error) {
        payload.data = schemaData;
    }

    return payload;
}

export default function translationLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.TRANSLATION}`,
            'utf8',
            (error: Error, schemaData: string) => {
                const schemaResults = handleSchemaLoader(error, schemaData);

                if (!schemaResults.data) {
                    reject(messages.invalidTranslationSchema());
                }

                resolve(schemaResults);
            },
        );
    });
}
