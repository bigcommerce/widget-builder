#!/usr/bin/env node
import path from 'path';

import { Command } from 'commander';
import inquirer from 'inquirer';

import { getAllWidgets } from '../../services/api/widget';
import downloadWidgetTemplate from '../../services/widgetTemplate/download';

const widgetTemplateDownload = () => {
    const program = new Command('download');

    return program
        .description('Select your widget template to download')
        .usage('select name')
        .action(() => {
            const widgetDir = path.resolve('.');
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
                inquirer.prompt(question).then((answer) => {
                    downloadWidgetTemplate(answer.widgetTemplate, widgetDir);
                });
            });
        });
};

export default widgetTemplateDownload;
