import React from 'react';
import './textInput.style.scss';

const TextInput = (props) => {
  const {
    label, onChange, value, placeholder
  } = props;

  return (
    <div>
      <input type="text" value={value} placeholder={placeholder} onChange={onChange} />
      {/* <label htmlFor={id} className={error && 'error'}>
        {error || label}
      </label> */}
    </div>
  );
};

export default TextInput;
