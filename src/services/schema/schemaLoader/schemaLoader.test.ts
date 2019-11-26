import schemaData from '../../__fixtures__/testSchema';

import { handleSchemaLoader } from './schemaLoader';

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
