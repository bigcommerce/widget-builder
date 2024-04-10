import React from 'react';
import { mount } from 'enzyme';

import { App } from './App';

jest.mock('socket.io-client', () => ({
    io: () => ({
        on: () => ({}),
    }),
}));

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
