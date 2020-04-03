import fs from 'fs';

import { generateWidgetConfiguration } from './schemaParser';

const schemaData = fs.readFileSync('src/services/__fixtures__/schema.json', 'utf8').toString();

describe('generateWidgetConfiguration', () => {
    it('correctly generates a widget configuration', () => {
        expect(generateWidgetConfiguration(JSON.parse(schemaData))).toMatchSnapshot();
    });
});
