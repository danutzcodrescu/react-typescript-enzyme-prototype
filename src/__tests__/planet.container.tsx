import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ErrorComponent } from '../components/error.component';
import { PlanetCont, PlanetContainer } from '../containers/planet.container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const planet = {
  id: '625',
  name: 'test',
  diameter: 'test',
  rotation_period: 'test',
  orbital_period: 'test',
  gravity: 'test',
  population: 'test',
  climate: 'test',
  terrain: 'test',
  surface_water: 'test',
  created: new Date(),
  edited: new Date()
};

describe('Containers: Planet Container', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <PlanetCont />
      </MemoryRouter>
    );
  });

  it('should display the loading indicator', () => {
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it('should display the error component', () => {
    wrapper.find(PlanetContainer).setState({ error: true });
    expect(wrapper.find(ErrorComponent)).toHaveLength(1);
  });

  it('should display the table component', () => {
    wrapper.find(PlanetContainer).setState({ loading: false, planet });
    expect(wrapper.find(CircularProgress)).toHaveLength(0);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(11);
    expect(
      wrapper
        .find(Typography)
        .at(0)
        .text()
    ).toBe(planet.name);
    expect(
      wrapper
        .find(Typography)
        .at(9)
        .text()
    ).toContain(planet.created.toLocaleDateString());
    expect(
      wrapper
        .find(Typography)
        .at(10)
        .text()
    ).toContain(planet.edited.toLocaleDateString());
  });
});
