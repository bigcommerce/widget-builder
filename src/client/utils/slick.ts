import $ from 'jquery';
import 'slick-carousel';

import { JqueryElement } from '../../types';

export const loadSlick = () => {
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
};

export default loadSlick;
