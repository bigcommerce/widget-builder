import fs from 'fs';

import WidgetFileType, { FileLoaderResponse } from '../../types';

import { generateRenderPayloadFromFileLoaderResults } from './widgetRenderer';

const configurationData = fs.readFileSync('src/services/__fixtures__/config.json', 'utf8').toString();
const htmlData = fs.readFileSync('src/services/__fixtures__/widget.html', 'utf8').toString();
const query = fs.readFileSync('src/services/__fixtures__/query.graphql', 'utf8').toString();
const queryParams = fs.readFileSync('src/services/__fixtures__/queryParams.json', 'utf8').toString();

const fileLoaderResponseData: FileLoaderResponse[] = [
    {
        type: WidgetFileType.TEMPLATE,
        data: htmlData,
    },
    {
        type: WidgetFileType.CONFIGURATION,
        data: configurationData,
    },
    {
        type: WidgetFileType.QUERY,
        data: query,
    },
    {
        type: WidgetFileType.QUERY_PARAMS,
        data: queryParams,
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
            storefront_api_query,
            storefront_api_query_params,
        } = generateRenderPayloadFromFileLoaderResults(fileLoaderResponseData);


        expect(widget_configuration).toEqual(JSON.parse(configurationData));
        expect(widget_template).toEqual(htmlData);
        expect(storefront_api_query).toEqual(query);
        expect(storefront_api_query_params).toEqual(JSON.parse(queryParams));
        expect(placement_uuid).not.toBeNull();
        expect(widget_uuid).not.toBeNull();
    });
});
