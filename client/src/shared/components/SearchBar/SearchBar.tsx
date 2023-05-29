import React, { useState } from 'react';

export interface SearchBarProps {
  height?: string;
  searchClass?: string;
  placeholder?: string;
  className?: string;
  onSearchEvent: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchEvent,
  placeholder = '',
  className = '',
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (): void => {
    onSearchEvent(searchTerm);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      onSearchEvent('');
    }
    setSearchTerm(e.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center text-disabled">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.3}
        stroke="currentColor"
        className="w-5 h-5 absolute ml-3 pointer-events-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          onChange(e);
        }}
        placeholder={placeholder}
        className={`pr-3 pl-10 h-10 px-2 text-sm font-normal placeholder-disabled text-dark rounded-md focus:outline-none focus:ring-1 focus:ring-blue border border-neutral-200 w-40 md:w-80 lg:w-[400px] h-10 ${className}`}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchBar;
