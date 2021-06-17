#!/usr/bin/env node

import { existsSync } from 'fs';
import path from 'path';

import { Command } from 'commander';

import publishWidgetTemplate from '../../services/widgetTemplate/publish';
import { log, messages } from '../../messages';
import checkCredentials from '../../services/auth/checkAuth';
import AUTH_CONFIG from '../../services/auth/authConfig';

const widgetTemplatePublish = () => {
    const program = new Command('publish');

    return program
        .arguments('<widget-template>')
        .description('Releases the widget template to the store belonging to the env config')
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

            publishWidgetTemplate(widgetTemplate, widgetTemplateDir);
        });
};

export default widgetTemplatePublish;
