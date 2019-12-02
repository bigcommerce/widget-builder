import configurationData from '../__fixtures__/testConfig';
import htmlData from '../__fixtures__/testWidget';
import WidgetFileType, { FileLoaderResponse } from '../../types';

import { generateRenderPayloadFromFileLoaderResults } from './widgetRenderer';

const fileLoaderResponseData: FileLoaderResponse[] = [
    {
        type: WidgetFileType.TEMPLATE,
        data: htmlData,
    },
    {
        type: WidgetFileType.CONFIGURATION,
        data: configurationData,
    },
];

describe('Widget Renderer', () => {
    it('renders correctly when all data is present', () => {
        expect(true).toEqual(true);
        const {
            widget_configuration,
            widget_template,
            placement_uuid,
            widget_uuid,
        } = generateRenderPayloadFromFileLoaderResults(fileLoaderResponseData);

        expect(widget_configuration).toEqual(JSON.parse(configurationData));
        expect(widget_template).toEqual(htmlData);
        expect(placement_uuid).not.toBeNull();
        expect(widget_uuid).not.toBeNull();
    });
});
