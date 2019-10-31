export function createElementFromHTML(htmlString: string) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.firstChild as HTMLElement;
}

const cloneScript = (scriptTag: HTMLScriptElement, contentDocument: HTMLDocument): HTMLScriptElement => {
    const newScript = contentDocument.createElement('script');
    Array.from(scriptTag.attributes).forEach(
        (attribute: Attr) => newScript.setAttribute(attribute.name, attribute.value),
    );

    if (scriptTag.textContent) {
        newScript.textContent = scriptTag.textContent;
    }

    return newScript;
};

export const executeWidgetScripts = (widget: HTMLElement, contentDocument: HTMLDocument) => {
    const widgetScripts = Array.from(widget.getElementsByTagName('script'));

    widgetScripts.forEach((scriptTag: HTMLScriptElement) => {
        const newScript = cloneScript(scriptTag, contentDocument);
        widget.insertBefore(newScript, scriptTag);
        widget.removeChild(scriptTag);
    });
};
