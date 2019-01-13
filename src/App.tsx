import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PlanetsContainer } from './containers/planets.container';
import { PlanetContainer } from './containers/planet.container';
import './App.css';
import { ErrorComponent } from './components/error.component';
import * as vars from './config/variables.json';

interface State {
  error: boolean;
}

class App extends Component<{}, State> {
  state: State = {
    error: false
  };
  componentDidCatch() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) {
      return <ErrorComponent message={vars.generalErrorMessage} />;
    }
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
