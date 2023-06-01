import React, { useState } from 'react';

export interface SortOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  buttonText: string;
  buttonIcon?: React.ReactNode;
  isEditMode?: boolean;
  options: SortOption[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  buttonIcon,
  isEditMode = true,
  options,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption | null>(null);
  const optionsCount: number = options.length - 1;

  const handleOptionSelect = (option: SortOption): void => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative border ${
        !isEditMode && 'border-transparent bg-transparent'
      } border-neutral-200 rounded-md`}
    >
      <button
        type="button"
        disabled={!isEditMode}
        className="flex items-center justify-between w-full p-2 text-sm"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="text-dark text-sm">{selectedOption?.label ?? buttonText}</span>
        {isEditMode && <span className="">{buttonIcon}</span>}
      </button>

      {isOpen && (
        <div className="absolute z-[2] mt-1">
          <div className="w-[177px] shadow-md rounded-lg">
            {options.map((option, index) => (
              <button
                key={option.value}
                className={`flex items-center w-[177px] h-[37px] text-sm text-left pl-2 text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-900 border border-b-gray-200 ${
                  index === 0 ? 'rounded-tl-lg rounded-tr-lg' : ''
                } ${index === optionsCount ? 'rounded-bl-lg rounded-br-lg' : ''}`}
                onClick={() => {
                  handleOptionSelect(option);
                }}
              >
                {option.label}
                {option.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
