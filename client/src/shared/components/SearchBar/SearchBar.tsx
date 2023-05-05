import React, { useState } from 'react';

export interface SearchBarProps {
  height?: string;
  width?: string;
  placeholder?: string;
  onSearchEvent: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchEvent,
  placeholder = ''
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (): void => {
    onSearchEvent(searchTerm);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const containerClasses =
    'pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2';

  return (
    <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
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
          setSearchTerm(e.target.value);
        }}
        placeholder={placeholder}
        className={containerClasses}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default SearchBar;
