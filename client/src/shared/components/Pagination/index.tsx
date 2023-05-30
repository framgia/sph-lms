import React from 'react';
import ArrowIcon from '../../icons/ArrowIcon';
import DoubleArrowIcon from '../../icons/DoubleArrowIcon';

export interface PaginationProps {
  maxPages: number;
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  maxPages,
  totalPages,
  currentPage,
  onChangePage,
}) => {
  const startIndex = Math.max(currentPage - Math.floor(Number(maxPages) / 2), 0);
  const endIndex = Math.min(startIndex + Number(maxPages), totalPages);
  const pages = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i + 1);
  const prevPage: number = currentPage - 1;
  const nextPage: number = currentPage + 1;
  const isFirstPage: boolean = currentPage === 1;
  const firstPage: number = 1;
  const isLastPage: boolean = currentPage === totalPages;
  const lastPage: number = totalPages;

  const handlePageChange = (page: number): void => {
    if (onChangePage != null) {
      onChangePage(page);
    }
  };

  const prevArrowClass = `flex items-center ${
    isFirstPage ? 'text-gray-400 cursor-not-allowed' : ''
  } border-2 border-white hover:border-red hover:text-red py-1 rounded-lg`;

  const nextArrowClass = `flex items-center ${
    isLastPage ? 'text-gray-400 cursor-not-allowed' : ''
  } border-2 border-white hover:border-red hover:text-red py-1 rounded-lg transform rotate-180`;

  return (
    <nav>
      <ul className="flex cursor-pointer">
        <li>
          <button
            className={prevArrowClass}
            onClick={() => {
              handlePageChange(firstPage);
            }}
            disabled={isFirstPage}
          >
            <DoubleArrowIcon />
          </button>
        </li>
        <li>
          <button
            className={prevArrowClass}
            onClick={() => {
              handlePageChange(currentPage === firstPage ? firstPage : prevPage);
            }}
            disabled={currentPage === firstPage}
          >
            <ArrowIcon className={!firstPage ? 'text-blue-600' : ''} />
          </button>
        </li>

        {pages.map((page) => {
          const isCurrentPage = currentPage === page;
          const isSelected = isCurrentPage
            ? 'border-2 bg-red text-white text-sm font-bold px-3 py-1 rounded-lg'
            : 'border-2 border-white hover:border-red text-gray-400 hover:text-red text-sm font-semibold hover:font-semibold px-3 py-1 rounded-lg';

          return (
            <li key={page}>
              <button
                className={isSelected}
                onClick={() => {
                  handlePageChange(page);
                }}
              >
                {page}
              </button>
            </li>
          );
        })}

        {endIndex < totalPages && <li className="ellipsis">...</li>}
        <li>
          <button
            className={nextArrowClass}
            onClick={() => {
              handlePageChange(currentPage === lastPage ? lastPage : nextPage);
            }}
            disabled={currentPage === lastPage}
          >
            <ArrowIcon />
          </button>
        </li>
        <li>
          <button
            className={nextArrowClass}
            onClick={() => {
              handlePageChange(lastPage);
            }}
            disabled={isLastPage}
          >
            <DoubleArrowIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
