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
  eventHandler?: (...args: any[]) => any;
}

const Select: React.FC<SelectProps<SelectOptionData>> = ({
  label,
  options,
  name,
  value,
  eventHandler
}) => {
  return (
    <div className="relative inline-block text-left">
      <select
        name={name}
        value={value}
        onChange={eventHandler}
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <option value="" disabled selected>
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
  value: ''
};

export default Select;
