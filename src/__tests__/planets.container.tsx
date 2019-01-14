import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { Planets, PlanetsContainer } from '../containers/planets.container';
import { MemoryRouter } from 'react-router';
import { ErrorComponent } from '../components/error.component';
import Paper from '@material-ui/core/Paper';
import { TableComponent } from '../components/table.component';
import { LoadingComponent } from '../components/loading.component';

describe('Containers: Planets Container', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Planets />
      </MemoryRouter>
    );
  });

  it('should display the loading indicator', () => {
    expect(wrapper.find(LoadingComponent)).toHaveLength(1);
  });

  it('should display the error component', () => {
    wrapper.find(PlanetsContainer).setState({ error: true });
    expect(wrapper.find(ErrorComponent)).toHaveLength(1);
  });

  it('should display the table component', () => {
    wrapper.find(PlanetsContainer).setState({ loading: false });
    expect(wrapper.find(LoadingComponent)).toHaveLength(0);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});
