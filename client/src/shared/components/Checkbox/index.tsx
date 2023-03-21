import React from 'react';

export interface Props {
  label?: string;
  options: string[];
  alignment?: string;
  className?: string;
  selectedOptions?: number[];
  onOptionChange?: (option: number) => void;
}

const Checkbox: React.FC<Props> = ({
  label,
  options,
  alignment,
  className,
  selectedOptions,
  onOptionChange
}: Props) => {
  const handleOptionChange = (optionIndex: number): void => {
    const isSelected = selectedOptions?.includes(optionIndex);
    if (onOptionChange != null && isSelected !== undefined) {
      if (isSelected) {
        onOptionChange(optionIndex);
      } else {
        onOptionChange(-optionIndex);
      }
    }
  };

  return (
    <div className="flex flex-col">
      {label != null && <label className={className}>{label}</label>}
      <div
        className={`${
          alignment === 'horizontal' ? 'flex flex-row' : 'flex flex-col'
        }`}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              className={className}
              type="checkbox"
              checked={selectedOptions?.includes(index + 1)}
              onChange={() => {
                handleOptionChange(index);
              }}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

Checkbox.defaultProps = {
  alignment: 'vertical',
  className: ''
};

export default Checkbox;
