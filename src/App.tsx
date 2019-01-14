import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { ErrorComponent } from './components/error.component';
import * as vars from './config/variables.json';
import { LoadingComponent } from './components/loading.component';

interface State {
  error: boolean;
}

const planets = lazy(() =>
  import(/* webpackChunkName: "PlanetsContainer" */ './containers/planets.container')
);

const planet = lazy(() =>
  import(/* webpackChunkName: "PlanetContainer" */ './containers/planet.container')
);

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
        <Suspense fallback={LoadingComponent}>
          <Route path="/" exact={true} component={planets} />
          <Route path="/planets/:id" component={planet} />
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
