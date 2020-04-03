import widgetConfigLoader from './widgetConfigLoader';

describe('widgetConfigLoader', () => {
    it('correctly loads widgetConfig', (done) => {
        widgetConfigLoader('src/services/__fixtures__').then((data) => {
            expect(data).toMatchSnapshot();
            done();
        });
    });
});
