/* import { log, messages } from '../../messages'; */
import { Widget } from '../../types';

/* import track from './track'; */

const downloadWidgetTemplate = async (widgetObject: Widget, widgetTemplateDir: string) => {
    const widgetTemplateUuid = widgetObject.uuid;
    console.log(widgetTemplateUuid); // eslint-disable-line no-console
    console.log(widgetObject); // eslint-disable-line no-console
    console.log(widgetTemplateDir); // eslint-disable-line no-console
    /* try {
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
    } */
};

export default downloadWidgetTemplate;
