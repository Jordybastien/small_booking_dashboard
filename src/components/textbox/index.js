import React from 'react';

const TextBox = ({ input, label, type, value, error, onChange, maxLength }) => (
  <div className="txtBox-container">
    <input
      {...input}
      placeholder={label}
      type={type}
      className="txtbox"
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
    <div className="error-lb-cont">
      {error && <span className="font-italic text-danger">{error}</span>}
    </div>
  </div>
);

export default TextBox;
