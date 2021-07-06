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

export default WidgetFileType;
