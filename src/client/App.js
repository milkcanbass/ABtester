import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.scss';

// Components
import NotFound from './pages/notFound/notFound';
import Survey from './pages/surveyPage/survey';
import TopPage from './pages/topPage/TopPage';

export default class App extends Component {
  render() {
    return (
      <>
        {/* <div className="mainWrapper">
          <div className="contentsWrapper"> */}
        <Switch>
          <Route exact path="/" component={TopPage} />
          <Route path="/survey/:survey" component={Survey} props="props" />
          <Route exact path="*" component={NotFound} />
        </Switch>
        {/* </div> */}
        {/* </div> */}
      </>
    );
  }
}
