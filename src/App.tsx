import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PlanetsContainer } from './containers/planets.container';
import { PlanetContainer } from './containers/planet.container';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route path="/" exact={true} component={PlanetsContainer} />
          <Route path="/planets/:id" component={PlanetContainer} />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
