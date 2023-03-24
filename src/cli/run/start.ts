#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import startWidgetBuilder from '../../server';
import checkCredentials from '../../services/auth/checkAuth';
import AUTH_CONFIG from '../../services/auth/authConfig';

const startCommand = () => {
    const program = new Command('start');
    const themeHost = process.env.WIDGET_BUILDER_THEME_HOST ? process.env.WIDGET_BUILDER_THEME_HOST : 'http://localhost:3000';

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

            startWidgetBuilder(widgetDir, options, themeHost);
        });
};

export default startCommand;
