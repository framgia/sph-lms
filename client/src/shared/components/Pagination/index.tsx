import React from 'react';
import DoublePreviousIcon from '@/src/shared/icons/DoublePreviousIcon';
import DoubleNextIcon from '@/src/shared/icons/DoubleNextIcon';
import SinglePreviousIcon from '../../icons/SinglePreviousIcon';
import SingleNextIcon from '../../icons/SingleNextIcon';

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
  onChangePage
}) => {
  const startIndex = Math.max(currentPage - Math.floor(maxPages / 2), 0);
  const endIndex = Math.min(startIndex + maxPages, totalPages);
  const pages = Array.from(
    { length: endIndex - startIndex },
    (_, i) => startIndex + i + 1
  );
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
    isFirstPage ? 'text-gray-400' : ''
  } border-2 border-white hover:border-red hover:text-red py-1 rounded-lg`;

  const nextArrowClass = `flex items-center ${
    isLastPage ? 'text-gray-400' : ''
  } border-2 border-white hover:border-red hover:text-red py-1 rounded-lg`;

  return (
    <nav>
      <ul className="flex cursor-pointer">
        <li>
          <div
            className={prevArrowClass}
            onClick={() => {
              handlePageChange(firstPage);
            }}
          >
            <DoublePreviousIcon height={23} width={23} />
          </div>
        </li>
        <li>
          <div
            className={prevArrowClass}
            onClick={() => {
              handlePageChange(
                currentPage === firstPage ? firstPage : prevPage
              );
            }}
          >
            <SinglePreviousIcon
              height={23}
              width={23}
              className={!firstPage ? 'text-blue-600' : ''}
            />
          </div>
        </li>

        {pages.map((page) => {
          const isCurrentPage = currentPage === page;
          const isSelected = isCurrentPage
            ? 'border-2 bg-red text-white text-sm font-bold px-3 py-1 rounded-lg'
            : 'border-2 border-white hover:border-red text-gray-400 hover:text-red text-sm font-semibold hover:font-semibold px-3 py-1 rounded-lg';

          return (
            <li key={page}>
              <div
                className={isSelected}
                onClick={() => {
                  handlePageChange(page);
                }}
              >
                {page}
              </div>
            </li>
          );
        })}

        {endIndex < totalPages && <li className="ellipsis">...</li>}
        <li>
          <div
            className={nextArrowClass}
            onClick={() => {
              handlePageChange(currentPage === lastPage ? lastPage : nextPage);
            }}
          >
            <SingleNextIcon height={23} width={23} />
          </div>
        </li>
        <li>
          <div
            className={nextArrowClass}
            onClick={() => {
              handlePageChange(lastPage);
            }}
          >
            <DoubleNextIcon height={23} width={23} />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
