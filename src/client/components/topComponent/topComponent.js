import React from 'react';
import img1 from '../../assets/topImage.jpg';
import './topComponent.style.scss';

// component
import PicturesSection from '../picturesSection/picturesSection';

const TopComponent = () => (
  <div className="testtest">
    <div className="topImage">
      <img src={img1} alt="topImage" />
      <div className="testSection">
        <h1>Which do you like?</h1>
        <p>ipsgegaijb jiaa pjgap grijmia ijfvfbk</p>
      </div>
    </div>
    <PicturesSection />
  </div>
);

export default TopComponent;
