import { readFileSync, writeFileSync } from 'fs';

import { log } from '../../messages';


const isTracked = (dir: string, channelId: string): string | null => {
    const filePath = (dir: string): string => `${dir}/widget-channel-${channelId}.yml`;

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

const startTracking = (dir: string, uuid: string, channelId: string) => {
    const filePath = (dir: string): string => `${dir}/widget-channel-${channelId}.yml`;

    try {
        writeFileSync(filePath(dir), uuid);
        log.success('New publishes now will update instead of creating a new instance');
    } catch (e) {
        throw e;
    }
};

export default {
    isTracked,
    startTracking,
};
