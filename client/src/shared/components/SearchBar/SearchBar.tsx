import React, { useState } from 'react';
import { debounce } from '@/src/shared/utils';

export interface SearchBarProps {
  onSearchEvent: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchEvent }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = debounce((query: string) => {
    onSearchEvent(query);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchQuery(value);
    handleSearch(value);
  };
  const containerClasses = 'pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2';

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
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search"
        className={containerClasses}
      />
    </div>
  );
};

export default SearchBar;
