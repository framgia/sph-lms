/* eslint-disable object-shorthand */
import React from 'react';

export interface SelectOptionData {
  id: number;
  text: string;
}

export interface SelectProps<SelectOptionData> {
  label?: string;
  options: SelectOptionData[];
  name?: string;
  value?: string;
  width?: string;
  height?: string;
  eventHandler?: (...args: any[]) => any;
}

const Select: React.FC<SelectProps<SelectOptionData>> = ({
  label,
  options,
  name,
  value,
  width,
  height,
  eventHandler
}) => {
  const propStyle = {
    width: width,
    height: height
  };

  return (
    <div className="mb-4">
      {label !== '' && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <select
        style={propStyle}
        name={name}
        value={value}
        onChange={eventHandler}
        className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className="py-2 px-4 my-1">
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.defaultProps = {
  label: '',
  value: '',
  width: '100%',
  height: ''
};

export default Select;
