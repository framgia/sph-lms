import React, { useState, useEffect, useRef } from 'react';
import ChevronDownIcon from '@/src/shared/icons/ChevronDownIcon';

export interface Option {
  text: string;
  url: string;
}

export interface DropdownProps {
  label?: string;
  options: Option[];
  classNames?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  classNames
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent): void => {
      if (
        dropdownRef.current != null &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleOptionSelectEvent = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className={`inline-flex justify-between w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ${
            classNames !== undefined ? classNames : ''
          }`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>{label}</span>
          <div className="-mr-1 ml-2 h-5 w-5" aria-hidden="true">
            <ChevronDownIcon height={20} width={20} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <a
                key={option.url}
                href={`${option.url}`}
                className={`${
                  selectedOption === option.url
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                role="menuitem"
                onClick={() => {
                  handleOptionSelectEvent(option.url);
                }}
              >
                {option.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  label: 'Dropdown Menu'
};

export default Dropdown;
