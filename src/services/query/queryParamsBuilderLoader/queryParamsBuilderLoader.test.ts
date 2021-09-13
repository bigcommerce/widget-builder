import { messages } from '../../../messages';

import queryParamsBuilderLoader from './queryParamsBuilderLoader';

describe('queryParamsBuilderLoader', () => {
    it('correctly loads queryParamsBuilder', (done) => {
        queryParamsBuilderLoader('src/services/__fixtures__').then((data) => {
            expect(data).toMatchSnapshot();
            done();
        });
    });

    describe('when it fails to load the file', () => {
        it('should reject with an error message', () => {
            const result = queryParamsBuilderLoader('src/services/__fixtures__/dummy_path');

            expect(result).rejects.toEqual(messages.invalidQueryParamsBuilder());
        });
    });
});
