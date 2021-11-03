#!/usr/bin/env node

import {
    existsSync, mkdirSync, rmdirSync, writeFileSync,
} from 'fs';

import { log, messages } from '../../../messages';

import { starterHtmlTemplate, starterConfiguration, starterSchema } from './starterTemplateConstants';

export class CreateStarterTemplate {
    // Name of the widget template supplied by the user
    _widgetTemplateName: string;

    // Name of the widget template directory created with the widget template name
    _widgetTemplateDir: string;

    // Name of the configuration file
    _configFile = 'config.json';

    // Name of the schema file
    _schemaFile = 'schema.json';

    // Name of the html template
    _templateFile = 'widget.html';

    constructor(templateName: string) {
        this._widgetTemplateName = templateName;
        this._widgetTemplateDir = `./${templateName}`;
    }

    createDirectory() {
        try {
            if (!existsSync(this._widgetTemplateDir)) {
                mkdirSync(this._widgetTemplateDir);
                log.success(messages.createWidgetTemplate.createSuccess(this._widgetTemplateDir));
            }
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._widgetTemplateDir));
        }

        return this;
    }

    createSchemaFile() {
        const configPath = `${this._widgetTemplateDir}/${this._schemaFile}`;

        try {
            writeFileSync(configPath, starterSchema);
            log.success(messages.createWidgetTemplate.createSuccess(this._schemaFile, configPath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._schemaFile, configPath));
        }

        return this;
    }

    createConfigurationFile() {
        const configPath = `${this._widgetTemplateDir}/${this._configFile}`;

        try {
            writeFileSync(configPath, starterConfiguration);
            log.success(messages.createWidgetTemplate.createSuccess(this._configFile, configPath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._configFile, configPath));
        }

        return this;
    }

    createTemplateFile() {
        const templatePath = `${this._widgetTemplateDir}/${this._templateFile}`;

        try {
            writeFileSync(templatePath, starterHtmlTemplate(this._widgetTemplateName));
            log.success(messages.createWidgetTemplate.createSuccess(this._templateFile, templatePath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._templateFile, templatePath));
        }

        return this;
    }

    removeDirectory() {
        try {
            if (existsSync(this._widgetTemplateDir)) {
                rmdirSync(this._widgetTemplateDir, { recursive: true });
                log.success(messages.createWidgetTemplate.removeSuccess(this._widgetTemplateDir));
            }
        } catch {
            log.error(messages.createWidgetTemplate.removeError(this._widgetTemplateDir));
        }
    }
}

const generate = (widgetTemplateName: string) => {
    const blankTemplate = new CreateStarterTemplate(widgetTemplateName);

    try {
        blankTemplate
            .createDirectory()
            .createSchemaFile()
            .createConfigurationFile()
            .createTemplateFile();
    } catch (e) {
        blankTemplate.removeDirectory();
        throw e;
    }
};

const createStarterWidgetTemplate = {
    generate,
};

export default createStarterWidgetTemplate;
