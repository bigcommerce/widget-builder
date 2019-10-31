export const EVENT_MESSAGES = {
    CONFIG_FILE_NOT_FOUND: 'Unable to find a config.json file, searching for schema.json...',
    SCHEMA_FILE_NOT_FOUND: 'Unable to locate a schema.json file... exiting program.',
    CREATE_CONFIG_FROM_SCHEMA: 'schema.json found and parsed, creating new config.json file now...',
    CONFIG_FILE_CREATED: 'New configuration file created! You may now modify this file.',
};

export enum WidgetFileType {
    WIDGET_TEMPLATE_HTML = 'widget.html',
    WIDGET_CONFIGURATION = 'config.json',
    WIDGET_SCHEMA = 'schema.json',
}

export interface FileLoaderResponse {
    type: WidgetFileType;
    data: string;
}
