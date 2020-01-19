import React from 'react';
import img1 from '../../assets/topImage.jpg';
import './topComponent.style.scss';

// component
import PicturesSection from '../picturesSection/picturesSection';

const TopComponent = () => (
  <div className="topComponentWrapper">
    <div className="topImage">
      <div className="imageContainer">
        <img src={img1} alt="topImage" />
      </div>
      <div className="textSection">
        <div className="title">Which do you like?</div>
        <div className="description">
          <p>Instant AB test service for you.</p>
          <p>We will create private survey page.</p>
          <p>The only thing you need to do is to upload 2 images and title,</p>
          <p>and share the url to your friends.</p>
        </div>
      </div>
    </div>
    <div className="topPicSection">
      <PicturesSection />
    </div>
  </div>
);

export default TopComponent;
