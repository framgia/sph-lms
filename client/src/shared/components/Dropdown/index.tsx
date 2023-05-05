/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from '@/src/shared/icons/ChevronDownIcon';
import { useOutsideClick } from '@/src/shared/hooks/useOutsideClick';
import { useSignOut } from '@/src/shared/hooks/useSignOut';
import Link from 'next/link';

export interface Option {
  text: string;
  url: string;
}

export interface DropdownProps {
  label: string | null;
  options: Option[];
  classNames?: string;
  showLogoutButton?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  classNames,
  showLogoutButton
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutButtonState, setShowLogoutButton] = useState<
  boolean | undefined
  >(showLogoutButton);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleOptionSelectEvent = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const { onSignOutEvent } = useSignOut();

  useEffect(() => {
    if (showLogoutButton !== undefined) {
      setShowLogoutButton(showLogoutButton);
    }
  }, [showLogoutButton]);

  return (
    <div className="relative inline-block text-left z-10" ref={dropdownRef}>
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
              <Link
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
              </Link>
            ))}
            {showLogoutButtonState && (
              <button
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 border-t border-gray-200"
                onClick={onSignOutEvent}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  showLogoutButton: false
};

export default Dropdown;
