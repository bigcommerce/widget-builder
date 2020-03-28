import fs from 'fs';

import { handleSchemaLoader } from './schemaLoader';

const schemaData = fs.readFileSync('src/services/__fixtures__/schema.json', 'utf8').toString();

describe('Schema Loader Handler', () => {
    it('properly returns schema object to resolve', () => {
        const { data } = handleSchemaLoader(null, schemaData);
        expect(data).toEqual(schemaData);
    });

    it('doesn\'t populate the data field if there is an error', () => {
        const { data } = handleSchemaLoader(Error('testing error'), schemaData);
        expect(data).not.toEqual(schemaData);
    });
});
