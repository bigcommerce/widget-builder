#!/usr/bin/env node

import { existsSync } from 'fs';
import path from 'path';

import { Command } from 'commander';
import inquirer from 'inquirer';

import deleteWidgetTemplate from '../../services/widgetTemplate/delete';
import { log, messages } from '../../messages';
import { getAllWidgets } from '../../services/api/widget';
import checkCredentials from '../../services/auth/checkAuth';
import AUTH_CONFIG from '../../services/auth/authConfig';

const widgetTemplateDelete = () => {
    const program = new Command('delete');

    return program
        .arguments('[widget-template]')
        .description('Delete a widget template')
        .usage('[widget-template]')
        .action((widgetTemplate) => {
            if (!widgetTemplate) {
                widgetTemplateDeleteWithOutName();
            } else {
                widgetTemplateDeleteWithName(widgetTemplate);
            }
        });
};

const widgetTemplateDeleteWithName = (widgetTemplate: string) => {
    const widgetTemplateDir = path.resolve(`./${widgetTemplate}`);
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

    deleteWidgetTemplate(widgetTemplate, widgetTemplateDir);
};

const widgetTemplateDeleteWithOutName = async () => {
    const widgets = await getAllWidgets();
    const question = [
        {
            type: 'list',
            messages: 'Select your widget template to delete',
            name: 'widgetTemplate',
            choices: widgets.map((widget) => ({
                name: widget.name,
                value: widget,
            })),
        },
    ];
    inquirer.prompt(question).then((answer) => {
        deleteWidgetTemplate(answer.widgetTemplate.name, undefined, answer.widgetTemplate.uuid);
    });
};

export default widgetTemplateDelete;
