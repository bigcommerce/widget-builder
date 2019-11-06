import { log, messages } from '../../messages';

import { AuthConfig } from './authConfig';

const checkCredentials = (authConfig: AuthConfig): boolean => {
    let checkStatus = true;
    Object.entries(authConfig).forEach(([key, value]: [string, string | undefined]) => {
        if (!value) {
            log.error(messages.invalidAuth(key));
            checkStatus = false;
        }
    });

    return checkStatus;
};

export default checkCredentials;
