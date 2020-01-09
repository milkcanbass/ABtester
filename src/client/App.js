import React, { Component } from 'react';
import './app.scss';
import MyModal from './components/modal/modal';

// Components
import Header from './components/header/header';
import PicturesSection from './components/picturesSection/picturesSection';

export default class App extends Component {
  render() {
    return (
      <div>
        <MyModal />
        <Header />
        <PicturesSection />
      </div>
    );
  }
}
