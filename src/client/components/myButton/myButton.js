import React from 'react';
import './myButton.scss';

// component
import LoadingCircle from '../loadingCircle/loadingCircle';

const MyButton = ({ disabled, children, ...otherprops }) => {
  if (disabled) {
    return <LoadingCircle />;
  }
  return (
    <button className="mybutton" {...otherprops}>
      {children}
    </button>
  );
};

export default MyButton;
