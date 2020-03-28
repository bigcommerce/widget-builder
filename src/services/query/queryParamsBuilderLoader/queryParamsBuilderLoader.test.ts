import queryParamsBuilderLoader from './queryParamsBuilderLoader';

describe('queryParamsBuilderLoader', () => {
    it('correctly loads queryParamsBuilder', (done) => {
        queryParamsBuilderLoader('src/services/__fixtures__').then((data) => {
            expect(data).toMatchSnapshot();
            done();
        });
    });
});
