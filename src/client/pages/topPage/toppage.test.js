import { shallow } from 'enzyme';
import React from 'react';
import TopPage from './TopPage';

it('call', () => {
  expect.assertions();
  expect('hello').toEqual('hello');
});

describe('TopPageSnapshot', () => {
  it("should render correctly in 'debug' mode", () => {
    const component = shallow(<TopPage debug />);
    expect(component).toMatchSnapshot();
  });
});
