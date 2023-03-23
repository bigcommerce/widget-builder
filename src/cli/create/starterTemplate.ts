#!/usr/bin/env node

import path from 'path';

import { Command } from 'commander';

import createStarterWidgetTemplate from '../../services/widgetTemplate/widgetTemplateCreate/createStarterTemplate';
import { log, messages } from '../../messages';
import startWidgetBuilder from '../../server';

const createStarterTemplate = () => {
    const program = new Command('create');
    const themeHost = process.env.WIDGET_BUILDER_THEME_HOST ? process.env.WIDGET_BUILDER_THEME_HOST : 'http://localhost:3000';

    program
        .arguments('<widget-template-name>')
        .description('Create a blank widget template', {
            'widget-template-name': 'Name of widget template',
        })
        .usage('<widget-template-name>')
        .action((name) => {
            if (!name) {
                log.error(messages.createWidgetTemplate.invalidName);

                return;
            }

            try {
                const widgetTemplateDir = path.resolve(`./${name}`);
                createStarterWidgetTemplate.generate(name);
                startWidgetBuilder(widgetTemplateDir, { autoOpen: true }, themeHost);
            } catch (e) {
                log.error(e.message);
            }
        });

    return program;
};

export default createStarterTemplate;
