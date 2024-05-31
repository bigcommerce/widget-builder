import { readFileSync, writeFileSync, rmSync } from 'fs';

import { log } from '../../messages';

const filePath = (dir: string): string => `${dir}/widget.yml`;

const isTracked = (dir: string): string | null => {
    try {
        const data = readFileSync(filePath(dir), 'utf-8');
        if (!data) {
            return null;
        }

        return data;
    } catch {
        return null;
    }
};

const startTracking = (dir: string, uuid: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        writeFileSync(filePath(dir), uuid);
        log.success('New publishes now will update instead of creating a new instance');
    } catch (e) {
        throw e;
    }
};

const removeTracking = (dir: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        rmSync(filePath(dir));
        log.success('Widget template is no longer being tracked');
    } catch (e) {
        throw e;
    }
};

export default {
    isTracked,
    startTracking,
    removeTracking,
};
