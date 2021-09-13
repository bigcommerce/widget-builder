import fs from 'fs';

import { log } from '../../../messages';

import QueryParamsBuilderValidator from './queryParamsBuilderValidator';


describe('validateQueryParamsBuilder', () => {
    it('returns true for valid queryParamsBuilder', () => {
        const queryParamsBuilder = JSON.parse(fs.readFileSync('src/services/__fixtures__/queryParamsBuilder.json')
            .toString());

        jest
            .spyOn(log, 'info')
            .mockImplementation(jest.fn());

        const validator = new QueryParamsBuilderValidator(queryParamsBuilder);
        expect(validator.validate()).toBe(true);
    });

    it('returns false for valid queryParamsBuilder', () => {
        const queryParamsBuilder = JSON.parse(fs.readFileSync('src/services/__fixtures__/queryParamsBuilder.json')
            .toString());

        jest
            .spyOn(log, 'error')
            .mockImplementation(jest.fn());

        queryParamsBuilder.productIds.type = 'Blah!';

        const validator = new QueryParamsBuilderValidator(queryParamsBuilder);
        expect(validator.validate()).toBe(false);
    });
});
