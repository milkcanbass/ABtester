import React from 'react';
import './progressBar.style.scss';

const Filler = (props) => <div className="filler" style={{ width: `${props.percentage}%` }} />;

const ProgressBar = (props) => {
  const { imageUrl1Like, imageUrl2Like } = props;
  const like1Percentage = (imageUrl2Like / (imageUrl1Like + imageUrl2Like)) * 100;

  return (
    <div className="progressBar">
      <Filler percentage={like1Percentage} />
    </div>
  );
};

export default ProgressBar;