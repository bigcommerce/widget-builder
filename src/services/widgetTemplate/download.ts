import { log, messages } from '../../messages';
import { Widget } from '../../types';

import createDownloadedWidgetTemplate from './widgetTemplateDownload/createDownloadedTemplate';

const downloadWidgetTemplate = async (widgetObject: Widget, widgetTemplateDir: string) => {
    try {
        if (!widgetObject) {
            log.error(messages.widgetRemove.failure);
            return;
        }
        createDownloadedWidgetTemplate.generate(widgetObject, widgetTemplateDir);
    } catch {
        log.error(messages.widgetRemove.failure);
    }
};

export default downloadWidgetTemplate;
