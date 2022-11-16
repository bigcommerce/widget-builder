export const port: string = process.env.WIDGET_BUILDER_PORT || '8080';
export const host: string = process.env.WIDGET_BUILDER_HOST || 'http://localhost';
export const channelId = process.env.WIDGET_BUILDER_CHANNEL_ID ? parseInt(process.env.WIDGET_BUILDER_CHANNEL_ID, 10) : 1;
