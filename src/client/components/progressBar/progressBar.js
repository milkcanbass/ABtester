import React, { useState } from 'react';
import './progressBar.style.scss';

const Filler = (props) => <div className="filler" style={{ width: `${props.percentage}%` }} />;

const ProgressBar = (props) => {
  const [percentage, setPercentage] = useState(50);

  return (
    <div className="progressBar">
      <Filler percentage={percentage} />
    </div>
  );
};

export default ProgressBar;
