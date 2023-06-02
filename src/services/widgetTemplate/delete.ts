import { log, messages } from '../../messages';
import { deleteWidget } from '../api/widget';
import track from './track';

const deleteWidgetTemplate = async (widgetName: string, widgetTemplateDir: string) => {
    const widgetTemplateUuid = track.isTracked(widgetTemplateDir);

    try {
        await deleteWidget(widgetTemplateUuid);
        log.success(messages.widgetTemplateDelete.success(widgetName));

    } catch {
        log.error(messages.widgetTemplateDelete.failure);
    }
};

export default deleteWidgetTemplate;
