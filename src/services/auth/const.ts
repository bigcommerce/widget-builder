export interface AuthConfig {
    storeId?: string;
    authId?: string;
    authToken?: string;
}

export const AUTH_CONFIG: AuthConfig = {
    storeId: process.env.WIDGET_BUILDER_STORE_ID,
    authId: process.env.WIDGET_BUILDER_AUTH_ID,
    authToken: process.env.WIDGET_BUILDER_AUTH_TOKEN,
};

export const checkCredentials = (authConfig: AuthConfig): boolean => {
    let checkStatus = true;
    Object.entries(authConfig).forEach(([key, value]: [string, string?]) => {
        if (!value) {
            console.log(`${key} is invalid`);
            checkStatus = false;
        }
    });

    return checkStatus;
};
