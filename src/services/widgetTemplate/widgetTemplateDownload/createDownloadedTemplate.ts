#!/usr/bin/env node

import {
    existsSync, mkdirSync, rmdirSync, writeFileSync,
} from 'fs';

import { log, messages } from '../../../messages';
import { Widget } from '../../../types';

export class CreateDownloadedTemplate {
    // Name of the widget template supplied by the user
    _widgetTemplateName: string;

    // Name of the widget template directory created with the widget template name
    _widgetTemplateDir: string;

    _widget: Widget;

    // Name of the configuration file
    _configFile = 'config.json';

    // Name of the schema file
    _schemaFile = 'schema.json';

    // Name of the html template
    _templateFile = 'widget.html';

    _queryFile = 'query.graphql';

    _queryParamsFile = 'queryParams.json';

    _queryParamsBuilderFile = 'queryParamsBuilder.json';

    _schemaTranslationsFile = 'schema_translations.json';

    _uuidFile = 'widget.yml';

    constructor(widget: Widget, templateName: string) {
        this._widget = widget;
        this._widgetTemplateDir = `${templateName}/${widget.name}`;
    }

    createDirectory() {
        try {
            if (!existsSync(this._widgetTemplateDir)) {
                mkdirSync(this._widgetTemplateDir);
                log.success(messages.createWidgetTemplate.createSuccess(this._widget.name));
            }
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._widget.name));
        }

        return this;
    }

    createSchemaFile() {
        const configPath = `${this._widgetTemplateDir}/${this._schemaFile}`;
        if (!this._widget.schema) return this;
        const schema = JSON.stringify(this._widget.schema, null, 2);
        try {
            writeFileSync(configPath, schema);
            log.success(messages.createWidgetTemplate.createSuccess(this._schemaFile, configPath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._schemaFile, configPath));
        }

        return this;
    }

    createTemplateFile() {
        const templatePath = `${this._widgetTemplateDir}/${this._templateFile}`;
        if (!this._widget.template) return this;
        const downloadedHtmlTemplate = this._widget.template;
        try {
            writeFileSync(templatePath, downloadedHtmlTemplate);
            log.success(messages.createWidgetTemplate.createSuccess(this._templateFile, templatePath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._templateFile, templatePath));
        }

        return this;
    }

    createUuidFile() {
        const uuidPath = `${this._widgetTemplateDir}/${this._uuidFile}`;
        if (!this._widget.uuid) return this;
        const downloadedUuid = this._widget.uuid;
        try {
            writeFileSync(uuidPath, downloadedUuid);
            log.success(messages.createWidgetTemplate.createSuccess(this._uuidFile, uuidPath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._uuidFile, uuidPath));
        }

        return this;
    }

    createQueryFile() {
        const queryPath = `${this._widgetTemplateDir}/${this._queryFile}`;
        if (!this._widget.storefront_api_query) return this;
        const downloadedQuery = this._widget.storefront_api_query;
        try {
            writeFileSync(queryPath, downloadedQuery);
            log.success(messages.createWidgetTemplate.createSuccess(this._queryFile, queryPath));
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._queryFile, queryPath));
        }

        return this;
    }

    createSchemaTranslationsFile() {
        const schemaTranslationsPath = `${this._widgetTemplateDir}/${this._schemaTranslationsFile}`;
        if (!this._widget.schema_translations || Object.keys(this._widget.schema_translations).length === 0) return;
        const downloadedSchemaTranslations = JSON.stringify(this._widget.schema_translations, null, 2);
        try {
            writeFileSync(schemaTranslationsPath, downloadedSchemaTranslations);
            log.success(messages.createWidgetTemplate.createSuccess(this._schemaTranslationsFile, schemaTranslationsPath)); // eslint-disable-line max-len
        } catch {
            throw new Error(messages.createWidgetTemplate.createError(this._schemaTranslationsFile, schemaTranslationsPath)); // eslint-disable-line max-len
        }
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

const generate = (widget: Widget, widgetTemplateName: string) => {
    const blankTemplate = new CreateDownloadedTemplate(widget, widgetTemplateName);

    try {
        blankTemplate
            .createDirectory()
            .createSchemaFile()
            .createTemplateFile()
            .createQueryFile()
            .createUuidFile()
            .createSchemaTranslationsFile();
    } catch (e) {
        blankTemplate.removeDirectory();
        throw e;
    }
};

const createDownloadedWidgetTemplate = {
    generate,
};

export default createDownloadedWidgetTemplate;
