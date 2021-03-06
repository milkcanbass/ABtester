import React from 'react';
import './inputSection.style.scss';

// component
import MyButton from '../myButton/myButton';

const TextInput = props => {
  const { label, onChange, value, placeholder } = props;

  return (
    <div className="textWrapper">
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        id="textInput"
        name="textInput"
        rows="2"
      />
      <MyButton onClick={e => this.submitComment(e)}>Submit</MyButton>
    </div>
  );
};

export default TextInput;
