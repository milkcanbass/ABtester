import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.scss';

// Components
import Header from './components/header/header';
import PicturesSection from './components/picturesSection/picturesSection';
import NotFound from './pages/notFound/notFound';
import Survey from './pages/surveyPage/survey';

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={PicturesSection} />
          <Route path="/survey/:survey" component={Survey} props="props" />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </>
    );
  }
}
