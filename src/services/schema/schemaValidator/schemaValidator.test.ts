import schemaData from '../../__fixtures__/testSchema';
import { log, messages } from '../../../messages';

import SchemaValidator from './schemaValidator';

describe('Schema Validator', () => {
    it('succeeds with valid schema json', () => {
        const validator = new SchemaValidator(JSON.parse(schemaData));
        const spy = jest.spyOn(messages, 'schemaValidated');

        validator.validate();
        expect(spy).toBeCalled();
        spy.mockRestore();
    });

    it('fails if schema is not valid', () => {
        const parsedSchema = JSON.parse(schemaData);
        parsedSchema[0].sections[0].settings[0].id = null;

        const validator = new SchemaValidator(parsedSchema);
        const spy = jest.spyOn(log, 'error');
        validator.validate();
        expect(spy).toBeCalled();
        spy.mockRestore();
    });
});
