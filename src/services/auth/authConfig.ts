import dotenv from 'dotenv';

dotenv.config();

export interface AuthConfig {
    storeHash?: string;
    authId?: string;
    authToken?: string;
}

const AUTH_CONFIG: AuthConfig = {
    storeHash: process.env.WIDGET_BUILDER_STORE_HASH,
    authId: process.env.WIDGET_BUILDER_AUTH_ID,
    authToken: process.env.WIDGET_BUILDER_AUTH_TOKEN,
};

export default AUTH_CONFIG;
