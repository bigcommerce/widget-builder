#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import startWidgetBuilder from '../../server';

const startCommand = () => {
    const program = new Command('start');

    return program
        .arguments('[widgetPath]')
        .description('starts the widget builder locally', {
            widgetPath: 'Path to widget template, default resolves to current directory',
        })
        .usage('/[widgetPath] || \'\'')
        .action((widgetPath: string) => {
            let widgetDir = path.resolve('.');

            if (widgetPath) {
                widgetDir += `/${widgetPath}`;
            }

            startWidgetBuilder(widgetDir, { autoOpen: true });
        });
};

export default startCommand;
