import * as widget from './widget';

describe('createElementFromHTML', () => {
    it('correctly creates an element', () => {
        const result = widget.createElementFromHTML('<div>Hello</div>');
        expect(result).toMatchSnapshot();
    });
});

describe('executeWidgetScripts', () => {
    it('correctly clones a script', () => {
        const widgetElement = document.createElement('div');
        widgetElement.innerHTML = `
            <script id="id1" data-test1="hi">
                console.log("first")
            </script>
            <script id="id2" data-test1="hi2">
                console.log("second")
            </script>
        `;

        widget.executeWidgetScripts(widgetElement, document);
        expect(widgetElement).toMatchSnapshot();
    });
});
