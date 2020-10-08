import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const SelectOption = ({
  name,
  options,
  label,
  meta: { touched, error, warning },
  input,
}) => (
  <div className="txtBox-container">
    <Select
      {...input}
      name={name}
      placeholder={label}
      allowClear
      className="mb-3 signup-select"
      showSearch={true}
      value={undefined}
    >
      {options.map((option) => (
        <Option value={option} key={option}>
          {option}
        </Option>
      ))}
    </Select>
    <div className="error-lb-cont">
      {touched &&
        ((error && <span className="font-italic text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default SelectOption;
