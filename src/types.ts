enum WidgetFileType {
    TEMPLATE = 'widget.html',
    CONFIGURATION = 'config.json',
    SCHEMA = 'schema.json',
    META = 'widget.yaml',
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
