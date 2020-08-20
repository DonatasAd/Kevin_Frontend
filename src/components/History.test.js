import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import History from './History';

configure({ adapter: new Adapter() });

describe('<History/>', () => {
  it('Should print two lines', () => {
    const wrap = shallow(<History />);
    wrap.setProps({ logs: ['log1', 'log2'] });
    expect(wrap.find('li')).toHaveLength(2);
  });
  it('renders with no props without crashing', () => {
    shallow(<History />);
  });
});
