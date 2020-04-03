import widgetTemplateLoader from './widgetTemplateLoader';

describe('widgetTemplateLoader', () => {
    it('correctly loads widgetTemplate', (done) => {
        widgetTemplateLoader('src/services/__fixtures__').then((data) => {
            expect(data).toMatchSnapshot();
            done();
        });
    });
});
