import React from 'react';
import './topComponent.style.scss';

// component
import PicturesSection from '../picturesSection/picturesSection';

const TopComponent = () => (
  <div className="topComponentWrapper">
    <div className="topImage">
      <div className="imageContainer" />
      <div className="textSection">
        <div className="title">Which do you like?</div>
        <div className="description">
          <h3>
            Free AB test service. We will create a private survey page. The only thing you need to
            do is to upload 2 images and title, and share the url to your friends.
          </h3>
        </div>
      </div>
    </div>
    <div className="topPicSection">
      <div className="topPicBackground">
        <h3>Upload images.(max size 1MB)</h3>
        <div className="picSecWrapper">
          <PicturesSection />
        </div>
      </div>
    </div>
  </div>
);

export default TopComponent;
