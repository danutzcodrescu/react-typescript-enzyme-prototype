import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PlanetsContainer } from './containers/planets.container';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route path="/" exact={true} component={PlanetsContainer} />
          <Route path="/planets/:id" render={() => <h1>test</h1>} />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
