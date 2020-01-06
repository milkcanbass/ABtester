import React, { Component } from 'react';
import './app.scss';
import TopPage from './pages/TopPage';
import image from './assets/Screen Shot 2019-10-31 at 4.53.03 PM.png';

// Components
import Header from './components/header/header';
import CardWindow from './components/cardWindow/cardWindow';

const axios = require('axios');

export default class App extends Component {
  componentDidMount() {
    axios.get('/api/members').then((res) => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <TopPage />
        <CardWindow />
      </div>
    );
  }
}
