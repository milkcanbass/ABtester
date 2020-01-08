import React, { Component } from 'react';
import './app.scss';

// Components
import Header from './components/header/header';
import PicturesSection from './components/picturesSection/picturesSection';

export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <PicturesSection />
      </div>
    );
  }
}
