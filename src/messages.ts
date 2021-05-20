import chalk from 'chalk';

function f(message: string) {
    return `[${new Date().toISOString()}] ${message}`;
}

/* eslint-disable no-console */
export const log = {
    debug: (message: string) => console.debug(chalk.grey(f(message))),
    info: (message: string) => console.log(chalk.blue(f(message))),
    notice: (message: string) => console.log(chalk.yellow(f(message))),
    error: (message: string) => console.error(chalk.red(f(message))),
    success: (message: string) => console.log(chalk.green(f(message))),
};
/* eslint-enable no-console */

/* eslint-disable max-len */
export const messages = {
    startup: (builderAddress: string) => `Starting widget-builder at ${builderAddress}!`,
    rerenderWidget: () => 'Re-rendering the widget. You should see changes reflect in the browser preview.',
    parseSchema: () => 'Parsing the schema.json file to generate a new config.json.',
    generateQueryParams: () => 'Generating a new queryParams.json.',
    fileChangeDetected: (filePath: string) => `Detected change to ${filePath}.`,
    invalidAuth: (configKey: string) => `${configKey} is invalid.`,
    invalidConfig: () => 'There was a problem loading the config.json file. Please double check the file or re-run the widget-builder using the --gen-config option.',
    invalidQuery: () => 'There was a problem loading the query.graphql file.',
    invalidQueryParams: () => 'There was a problem loading the queryParams.json file. Please double check the file or re-run the widget-builder using the --gen-query-params option.',
    invalidQueryParamsBuilder: () => 'There was a problem loading the queryParamsBuilder.json file.',
    invalidSchema: () => 'There was a problem loading the schema.json file.',
    schemaValidated: () => 'The schema.json file was successfully validated.',
    queryParamsBuilderValidated: () => 'The queryParamsBuilder.json file was successfully validated.',
    invalidWidgetTemplate: () => 'There was a problem loading the widget.html file.',
    configFileWritten: () => 'Updated the config.json file.',
    configWriteError: () => 'There was a problem writing to the config.json file.',
    queryParamsWritten: () => 'Updated the queryParams.json file.',
    queryParamsWriteError: () => 'There was a problem writing to the queryParams.json file.',
    socketConnected: () => 'Socket connected.',
    socketDisconnected: () => 'Socket disconnected.',
    unauthorizedAccess: () => 'Unauthorized access, please check your credentials again',
};
/* eslint-enable max-len */
