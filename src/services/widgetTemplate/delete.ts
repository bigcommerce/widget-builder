import { log, messages } from '../../messages';
import { deleteWidget } from '../api/widget';

import track from './track';

const deleteWidgetTemplate = async (widgetName: string, widgetTemplateDir: string) => {
    const widgetTemplateUuid = track.isTracked(widgetTemplateDir);

    try {
        if (!widgetTemplateUuid) {
            log.error(messages.widgetRemove.invalidUuid);
            return;
        }
        const removed = await deleteWidget(widgetTemplateUuid);
        if (!removed) {
            log.error(messages.widgetRemove.failure);
            return;
        }
        track.removeTracking(widgetTemplateDir);
        log.success(messages.widgetRemove.success(widgetName));
    } catch {
        log.error(messages.widgetRemove.failure);
    }
};

export default deleteWidgetTemplate;
