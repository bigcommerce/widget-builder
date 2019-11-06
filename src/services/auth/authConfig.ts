export interface AuthConfig {
    storeId?: string;
    authId?: string;
    authToken?: string;
}

const AUTH_CONFIG: AuthConfig = {
    storeId: process.env.WIDGET_BUILDER_STORE_ID,
    authId: process.env.WIDGET_BUILDER_AUTH_ID,
    authToken: process.env.WIDGET_BUILDER_AUTH_TOKEN,
};

export default AUTH_CONFIG;
