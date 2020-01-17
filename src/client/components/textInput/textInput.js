import React from 'react';
import './textInput.style.scss';

// component

const TextInput = (props) => {
  const {
    label, onChange, value, placeholder
  } = props;

  return (
    <input
      type="text"
      className="inputForm"
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextInput;
