#!/usr/bin/env node

import { existsSync } from 'fs';
import path from 'path';

import { Command } from 'commander';

import deleteWidgetTemplate from '../../services/widgetTemplate/delete';
import { log, messages } from '../../messages';
import checkCredentials from '../../services/auth/checkAuth';
import AUTH_CONFIG from '../../services/auth/authConfig';

const widgetTemplateDelete = () => {
    const program = new Command('delete');

    return program
        .arguments('<widget-template>')
        .description('Delete a widget template')
        .usage('<widget-template>')
        .action((widgetTemplate) => {
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
        });
};

export default widgetTemplateDelete;
