import queryLoader from './queryLoader';

describe('queryLoader', () => {
    it('correctly loads query', (done) => {
        queryLoader('src/services/__fixtures__').then((data) => {
            expect(data).toMatchSnapshot();
            done();
        });
    });
});
