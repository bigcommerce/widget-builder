#!/usr/bin/env node

import { Command } from 'commander';

import publishWidgetTemplate from '../../services/widgetTemplate/publish';
import { log } from '../../messages';

const widgetTemplatePublish = () => {
    const program = new Command('publish');

    return program
        .arguments('<widget-template>')
        .description('Releases the widget template to the store belonging to the env config')
        .usage('<widget-template>')
        .action((widgetTemplate) => {
            if (!widgetTemplate) {
                log.error('Please provide a valid widget-template');
                return;
            }

            publishWidgetTemplate(widgetTemplate);
        });
};

export default widgetTemplatePublish;
