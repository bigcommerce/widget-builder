import queryParamsLoader from './queryParamsLoader';

describe('queryParamsLoader', () => {
    it('correctly loads query params', (done) => {
        queryParamsLoader('src/services/__fixtures__').then((data) => {
            expect(data).toMatchSnapshot();
            done();
        });
    });
});
