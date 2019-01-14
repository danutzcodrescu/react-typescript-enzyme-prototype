import * as React from 'react';
import { shallow } from 'enzyme';
import { LoadingComponent } from '../components/loading.component';
import CircularProgress from '@material-ui/core/CircularProgress';

describe('Components: Loading Component', () => {
  it('should display the Circular Progress', () => {
    const wrapper = shallow(<LoadingComponent />);
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });
});
