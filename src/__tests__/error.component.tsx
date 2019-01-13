import * as React from 'react';
import { shallow } from 'enzyme';
import { ErrorComponent } from '../components/error.component';

describe('Components: Error Component', () => {
  it('should display the message passed as props', () => {
    const wrapper = shallow(<ErrorComponent message="test" />);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('test');
  });
});
