import React, { Component } from 'react';
import './app.scss';
import TopPage from './pages/TopPage';
import image from './assets/Screen Shot 2019-10-31 at 4.53.03 PM.png';

// Components
import Header from './components/header/header';
import PicturesSection from './components/picturesSection/picturesSection';

export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <TopPage />
        <PicturesSection />
      </div>
    );
  }
}
