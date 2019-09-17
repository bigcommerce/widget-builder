import { shallow } from 'enzyme';
import React from 'react';
import createMockStore from 'redux-mock-store';

import { App } from './App';

const store = createMockStore()({});
const app = shallow(<App
    store={store}
    title={''}
    getTitle={jest.fn()}
/>);

it('renders', () => {
    expect(app).toMatchSnapshot();
});
