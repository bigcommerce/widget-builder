import 'jquery';

enum WidgetFileType {
    TEMPLATE = 'widget.html',
    CONFIGURATION = 'config.json',
    SCHEMA = 'schema.json',
    META = 'widget.yaml',
    QUERY = 'query.graphql',
    QUERY_PARAMS = 'queryParams.json',
    QUERY_PARAMS_BUILDER = 'queryParamsBuilder.json',
    TRANSLATION = 'schema_translations.json',
}

export interface FileLoaderResponse {
    type: WidgetFileType;
    data: string;
}

export interface SocketData {
    event: string;
    html: string;
    path: string;
}

export interface JqueryElement extends JQuery<HTMLElement> {
    slick(options?: object | string): void;
}

export interface WidgetResponse {
    data: Widget[];
}

export interface Widget {
    uuid: string;
    name: string;
    schema: WidgetResponseSchema[];
    template: string;
    date_created: Date;
    date_modified: Date;
    kind: string;
    storefront_api_query: string;
    icon_name: string;
    template_engine: string;
    client_rerender: boolean;
    current_version_uuid: string;
    channel_id: number;
    schema_translations: object;
}

export interface WidgetResponseSchema {
    type: string;
    label: string;
    id?: string;
    defaultCount?: number;
    entryLabel?: string;
    schema?: SchemaSchema[];
    sections?: FluffySection[];
}

export interface SchemaSchema {
    type: string;
    label: string;
    sections: PurpleSection[];
}

export interface PurpleSection {
    settings: PurpleSetting[];
}

export interface PurpleSetting {
    type: string;
    label: string;
    id: string;
    default: string;
}

export interface FluffySection {
    label: string;
    settings: FluffySetting[];
}

export interface FluffySetting {
    type: string;
    label: string;
    id: string;
    default?: boolean | string;
    placeholder?: string;
}

export default WidgetFileType;
