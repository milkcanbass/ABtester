import React from 'react';
import './myButton.scss';

const MyButton = ({ ready, children, ...otherprops }) => (
  <button className={`${ready ? 'ready' : 'not'}`} {...otherprops}>
    {children}
  </button>
);

export default MyButton;
