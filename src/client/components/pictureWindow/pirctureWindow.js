import React, { Component } from 'react';
import image from '../../assets/sample.png';
import './pirctureWindow.scss';

class PictureWindow extends Component {
  render() {
    return (
      <div className="picWidWrapper">
        <img src={image} alt="upload image" />
      </div>
    );
  }
}

export default PictureWindow;
