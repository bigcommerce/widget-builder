import path from 'path';
import { existsSync } from 'fs';

import { log, messages } from '../../messages';
import { deleteWidget } from '../api/widget';

import track from './track';

const deleteWidgetTemplate = async (widgetName: string, widgetTemplateDir?: string, widgetUUID?: string) => {
    if (!widgetTemplateDir) {
        deleteWidgetWithOutDir(widgetName, widgetUUID);
    } else {
        deleteWidgetWithDir(widgetName, widgetTemplateDir);
    }
};

const deleteWidgetWithDir = async (widgetName: string, widgetTemplateDir: string) => {
    const widgetTemplateUuid = track.isTracked(widgetTemplateDir);
    try {
        if (!widgetTemplateUuid) {
            log.error(messages.widgetRemove.invalidUuid);
            return;
        }
        await deleteWidgetByUUID(widgetTemplateUuid, widgetName);
        track.removeTracking(widgetTemplateDir);
    } catch {
        log.error(messages.widgetRemove.failure);
    }
};

const deleteWidgetWithOutDir = async (widgetName: string, widgetUUID?: string) => {
    const widgetTemplateDir = path.resolve(`./${widgetName}`);

    if (!widgetName) {
        log.error(messages.widgetRelease.invalidName);
        return;
    }

    if (existsSync(widgetTemplateDir)) {
        deleteWidgetTemplate(widgetName, widgetTemplateDir);
    } else {
        if (!widgetUUID) {
            log.error(messages.widgetRemove.invalidUuid);
            return;
        }
        deleteWidgetByUUID(widgetUUID, widgetName);
    }
};

const deleteWidgetByUUID = async (widgetUUID: string, widgetName: string) => {
    try {
        const removed = await deleteWidget(widgetUUID);
        if (!removed) {
            log.error(messages.widgetRemove.failure);
            return;
        }
        log.success(messages.widgetRemove.success(widgetName));
    } catch {
        log.error(messages.widgetRemove.failure);
    }
};

export default deleteWidgetTemplate;
