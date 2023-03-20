import React, { useState, Fragment } from 'react';
import type { FC } from 'react';

export interface RadioProps {
  label?: string;
  options: string[];
  alignment?: string;
  classname?: string;
  description?: string;
  onClickEvent?: (query: string) => void;
}

const RadioButton: FC<RadioProps> = ({
  label,
  options,
  alignment,
  classname,
  description,
  onClickEvent
}: RadioProps) => {
  const [selectedOption, setSelectedOption] = useState('');
  const handleOnClick = (value: any): void => {
    setSelectedOption(value);
    console.log(selectedOption);
  };
  return (
    <Fragment>
      {label !== null && (
        <div className="pb-2">
          <label className={classname}>{label}</label>
          <p className="w-2/4 text-slate-400 text-sm">{description}</p>
        </div>
      )}
      <div
        className={`${
          alignment === 'horizontal' ? 'flex flex-row' : 'flex flex-col'
        }`}
      >
        {options.map((option, index) => (
          <div key={index} className="flex flex-row space-x-2 pr-4 pb-2">
            <input
              className={classname}
              type="radio"
              value={option}
              checked={selectedOption.includes(option)}
              onClick={() => {
                // sample of onclickevent
                handleOnClick(`${option}`);
              }}
            ></input>
            <div className="block text-gray-700 text-sm mb-2">{option}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

RadioButton.defaultProps = {
  label: '',
  alignment: 'vertical',
  classname: ''
};
export default RadioButton;
