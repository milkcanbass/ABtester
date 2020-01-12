import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.scss';

// Components
import Header from './components/header/header';
import PicturesSection from './components/picturesSection/picturesSection';
import NotFound from './pages/notFound/notFound';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={PicturesSection} />
          <Route exact path="/test" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
