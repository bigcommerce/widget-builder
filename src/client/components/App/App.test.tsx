import { shallow } from 'enzyme';
import React from 'react';

import { App } from './App';

const app = shallow(<App/>);

it('renders', () => {
    expect(app).toMatchSnapshot();
});
