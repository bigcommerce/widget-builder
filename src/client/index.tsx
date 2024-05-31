import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'slick-carousel';

import { App } from './components/App/App';

interface JqueryElement extends JQuery<HTMLElement> {
    slick(options?: object | string): void;
}

$(() => {
    const $slicks = $('[data-slick]');
    if (!$slicks.length) return;
    $slicks.each((_, element) => {
        const $element = $(element) as JqueryElement;
        const options = $element.data('slick');
        $element.slick(options);
    });
    const $head = $('head');
    const $link = document.createElement('link');
    $link.rel = 'stylesheet';
    $link.type = 'text/css';
    $link.href = 'slick-style.css';
    $head.append($link);
});

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
