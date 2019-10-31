import * as fs from 'fs';

import { EVENT_MESSAGES, FileLoaderResponse, WidgetFileType } from '../../server/const';
import { generateWidgetConfiguration, SchemaElement } from '../schemaParser/schemaParser';
import validateSchema from '../schemaValidator/schemaValidator';


export default function widgetConfigLoader(widgetDir: string): Promise<FileLoaderResponse> {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${widgetDir}/${WidgetFileType.WIDGET_CONFIGURATION}`,
            'utf8',
            (configLoadError: Error, data: string) => {
                if (!data) {
                    fs.readFile(
                        `${widgetDir}/${WidgetFileType.WIDGET_SCHEMA}`,
                        'utf8',
                        (schemaLoadError: Error, schemaData: string) => {
                            if (!schemaData || schemaLoadError) {
                                console.log(EVENT_MESSAGES.SCHEMA_FILE_NOT_FOUND);
                                process.exit(1);
                            }

                            const schema = validateSchema(schemaData);
                            if (!schema) {
                                console.log(EVENT_MESSAGES.SCHEMA_FILE_NOT_VALID);
                                process.exit(1);
                            }

                            const widgetConfiguration = generateWidgetConfiguration(schema as SchemaElement[]);
                            const widgetConfigurationJson = JSON.stringify(
                                widgetConfiguration, null, 2,
                            );
                            console.log(EVENT_MESSAGES.CREATE_CONFIG_FROM_SCHEMA);

                            fs.writeFile(
                                `${widgetDir}/${WidgetFileType.WIDGET_CONFIGURATION}`, widgetConfigurationJson,
                                (configWriteError: Error) => {
                                    if (configWriteError) {
                                        reject(EVENT_MESSAGES.CONFIG_FILE_NOT_FOUND);
                                    }

                                    console.log(EVENT_MESSAGES.CONFIG_FILE_CREATED);
                                },
                            );

                            resolve({
                                type: WidgetFileType.WIDGET_CONFIGURATION,
                                data: widgetConfigurationJson,
                            });
                        },
                    );
                } else {
                    resolve({
                        type: WidgetFileType.WIDGET_CONFIGURATION,
                        data,
                    });
                }
            },
        );
    });
}
