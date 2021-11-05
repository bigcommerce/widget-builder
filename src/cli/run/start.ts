#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import startWidgetBuilder from '../../server';
import checkCredentials from '../../services/auth/checkAuth';
import AUTH_CONFIG from '../../services/auth/authConfig';

const startCommand = () => {
    const program = new Command('start');

    return program
        .arguments('[widgetPath]')
        .description('starts the widget builder locally', {
            widgetPath: 'Path to widget template, default resolves to current directory',
        })
        .option('--gen-config', 'generate a config.json file')
        .option('--gen-query-params', 'generate a queryParams.json file')
        .option('--auto-open <flag>', 'automatically open the browser', true)
        .usage('/[widgetPath] || \'\'')
        .action((widgetPath: string, options) => {
            let widgetDir = path.resolve('.');

            if (!checkCredentials(AUTH_CONFIG)) {
                process.exit(1);
            }

            if (widgetPath) {
                widgetDir += `/${widgetPath}`;
            }

            startWidgetBuilder(widgetDir, options);
        });
};

export default startCommand;
