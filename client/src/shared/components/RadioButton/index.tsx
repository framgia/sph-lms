import React, { useState, Fragment } from 'react';
import type { FC } from 'react';

export interface RadioProps {
  description?: string;
  label?: string;
  options: string[];
  alignment?: string;
  classname?: string;
  onClickEvent?: (query: string) => void;
  selectedOption?: string;
  onOptionChange?: (option: string) => void;
}

const RadioButton: FC<RadioProps> = ({
  description,
  label,
  options,
  alignment,
  classname,
  onClickEvent,
  selectedOption,
  onOptionChange
}: RadioProps) => {
  const [option, setOption] = useState(selectedOption != null || '');

  const handleOptionChange = (value: string): void => {
    setOption(value);
    if (onOptionChange != null) {
      onOptionChange(value);
    }
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
        {options.map((optionValue, index) => (
          <div key={index} className="flex flex-row space-x-2 pr-4">
            <input
              className={classname}
              type="radio"
              value={optionValue}
              checked={option === optionValue}
              onClick={() => {
                handleOptionChange(optionValue);
                if (onClickEvent != null) {
                  onClickEvent(optionValue);
                }
              }}
            />
            <div className={classname}>{optionValue}</div>
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
