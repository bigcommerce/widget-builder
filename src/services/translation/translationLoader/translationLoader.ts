import * as fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../../types';
import { messages } from '../../../messages';

export const translationDefaultPayload = {
    type: WidgetFileType.TRANSLATION,
    data: '{}',
};

export function handleSchemaLoader(error: Error | null, schemaData: string): FileLoaderResponse {
    if (schemaData && !error) {
        return {
            ...translationDefaultPayload,
            data: schemaData,
        }
    }

    return translationDefaultPayload;
}

export default function translationLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.TRANSLATION}`,
            'utf8',
            (error: NodeJS.ErrnoException, schemaData: string) => {
                if (error && error.code === 'ENOENT') {
                    resolve(translationDefaultPayload);
                }

                const schemaResults = handleSchemaLoader(error, schemaData);

                if (!schemaResults.data) {
                    reject(messages.invalidTranslationSchema());
                }

                resolve(schemaResults);
            },
        );
    });
}
