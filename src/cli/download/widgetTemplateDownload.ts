#!/usr/bin/env node

/* import { existsSync } from 'fs';
import path from 'path';
 */
import { Command } from 'commander';
import inquirer from 'inquirer';

import { getAllWidgets } from '../../services/api/widget';
/* import { log, messages } from '../../messages';
import checkCredentials from '../../services/auth/checkAuth';
import AUTH_CONFIG from '../../services/auth/authConfig'; */

const widgetTemplateDownload = () => {
    const program = new Command('download');

    return program
        .description('Select your widget template to download')
        .usage('select name')
        .action(() => {
            getAllWidgets().then((widgets) => {
                const question = [
                    {
                        type: 'list',
                        messages: 'Select your widget template to download',
                        name: 'widgetTemplate',
                        choices: widgets.map((widget) => ({
                            name: widget.name,
                            value: widget,
                        })),
                    },
                ];
                inquirer.prompt(question).then((answers) => {
                    console.log('Selected toppings:', answers.toppings); // eslint-disable-line no-console
                    console.log('Selected Options:', answers); // eslint-disable-line no-console
                });
            });
            /* const widgetTemplateDir = path.resolve(`./${widgetTemplate}`);
            if (!checkCredentials(AUTH_CONFIG)) {
                process.exit(1);
            }

            if (!widgetTemplate) {
                log.error(messages.widgetRelease.invalidName);
                return;
            }

            if (!existsSync(widgetTemplateDir)) {
                log.error('Widget Template doesn\'t exist');
                return;
            }

            downloadWidgetTemplate(widgetTemplate, widgetTemplateDir); */
        });
};

export default widgetTemplateDownload;
