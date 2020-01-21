import { log, messages } from '../../messages';
import { FileLoaderResponse } from '../../types';
import schemaLoader from '../schema/schemaLoader/schemaLoader';
import { generateWidgetConfiguration } from '../schema/schemaParser/schemaParser';

import widgetConfigWriter from './widgetConfigWriter/widgetConfigWriter';

export default function generateConfig(directory: string) {
    return new Promise((resolve) => {
        schemaLoader(directory)
            .then(({ data }: FileLoaderResponse) => {
                log.info(messages.parseSchema());
                const schema = JSON.parse(data);
                const widgetConfiguration = generateWidgetConfiguration(schema);
                const widgetConfigurationJson = JSON.stringify(
                    widgetConfiguration, null, 2,
                );
                widgetConfigWriter(directory, widgetConfigurationJson).then(() => {
                    log.info(messages.configFileWritten());
                    resolve();
                });
            })
            .catch((error: string) => {
                log.error(error);
            });
    });
}
