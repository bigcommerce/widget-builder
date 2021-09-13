import fs from 'fs';

import { log, messages } from '../../../messages';

import TranslationValidator from './translationValidator';

const schemaData = fs.readFileSync('src/services/__fixtures__/schema_translations.json', 'utf8').toString();

describe('Schema Translations Validator', () => {
    beforeEach(() => {
        jest
            .spyOn(log, 'info')
            .mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('succeeds with valid schema json', () => {
        const validator = new TranslationValidator(JSON.parse(schemaData));
        const spy = jest.spyOn(messages, 'translationSchemaValidated');

        validator.validate();
        expect(spy).toBeCalled();
    });

    it('fails if schema is not valid', () => {
        const parsedSchema = JSON.parse(schemaData);
        parsedSchema['i18n.LineColor'].default = undefined;

        const validator = new TranslationValidator(parsedSchema);
        const spy = jest.spyOn(log, 'error').mockImplementation(jest.fn());
        validator.validate();
        expect(spy).toBeCalled();
    });
});
