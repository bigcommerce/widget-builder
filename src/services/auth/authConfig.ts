import dotenv from 'dotenv';

dotenv.config();

export interface AuthConfig {
    authId: string;
    apiPath: string;
    authToken: string;
}

const AUTH_CONFIG: AuthConfig = {
    authId: process.env.WIDGET_BUILDER_AUTH_ID || '',
    apiPath: process.env.WIDGET_BUILDER_API_GATEWAY_BASE || '',
    authToken: process.env.WIDGET_BUILDER_AUTH_TOKEN || '',
};

export default AUTH_CONFIG;
