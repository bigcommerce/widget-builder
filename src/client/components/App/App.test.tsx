import { mount } from 'enzyme';
import React from 'react';

import { App } from './App';


it('renders', () => {
    const app = mount(<App/>);
    expect(app.getDOMNode()).toMatchSnapshot();
});

describe('mountWidget', () => {
    it('correctly mounts a widget', () => {
        const app = mount(<App/>);
        (app.instance() as App).mountWidget('<div>blah</div>');
        expect(app.getDOMNode()).toMatchSnapshot();
    });
});
