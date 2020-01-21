import React from 'react';
import './likeIcon.style.scss';

// image
import svgImg from '../../assets/heart.svg';

const LikeIcon = (props) => {
  const {
    onClick, window, imageUrl1Like, imageUrl2Like
  } = props;

  let heartNum;

  if (window === 'window1') {
    heartNum = imageUrl1Like;
  } else {
    heartNum = imageUrl2Like;
  }

  return (
    <div className="heartWrapper" onClick={onClick}>
      <img src={svgImg} className="heartIcon" alt="heart icon" />
      <span className="heartNum">{heartNum}</span>
    </div>
  );
};

export default LikeIcon;
