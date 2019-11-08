import chalk from 'chalk';

function f(message: string) {
    return `[${new Date().toISOString()}] ${message}`;
}

export const log = {
    debug: (message: any) => console.debug(chalk.grey(f(message))),
    info: (message: any) => console.log(chalk.blue(f(message))),
    notice: (message: any) => console.log(chalk.yellow(f(message))),
    error: (message: any) => console.error(chalk.red(f(message))),
    success: (message: any) => console.log(chalk.green(f(message))),
};

export const messages = {
    startup: (builderAddress: string) => `Starting widget-builder at ${builderAddress}!`,
    rerenderWidget: () => 'Re-rendering the widget. You should see changes reflect in the browser preview.',
    parseSchema: () => 'Parsing the schema.json file to generate a new config.json.',
    fileChangeDetected: (filePath: string) => `Detected change to ${filePath}.`,
    invalidAuth: (configKey: string) => `${configKey} is invalid.`,
    invalidConfig: () => 'There was a problem loading the config.json file. Please double check the file or re-run the widget-builder using the --gen-config option.',
    invalidSchema: () => 'There was a problem loading the schema.json file.',
    schemaValidated: () => 'The schema.json file was successfully validated.',
    invalidWidgetTemplate: () => 'There was a problem loading the widget.html file.',
    configFileWritten: () => 'Updated the config.json file.',
    configWriteError: () => 'There was a problem writing to the config.json file.',
    socketConnected: () => 'Socket connected.',
    socketDisconnected: () => 'Socket disconnected.',
};
