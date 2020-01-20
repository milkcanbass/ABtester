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
          <p>
            Instant AB test service for you. We will create a private survey page. The only thing
            you need to do is to upload 2 images and title, and share the url to your friends.
          </p>
        </div>
      </div>
    </div>
    <div className="topPicSection">
      <div className="topPicBackground">
        <h1>hello</h1>
        <PicturesSection />
      </div>
    </div>
  </div>
);

export default TopComponent;
