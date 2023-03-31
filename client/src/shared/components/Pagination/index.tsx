import React from 'react';
import PreviousIcon from '@/src/shared/icons/PreviousIcon';
import NextIcon from '@/src/shared/icons/NextIcon';

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
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number): void => {
    if (onChangePage != null) {
      onChangePage(page);
    }
  };

  return (
    <nav>
      <ul className="flex cursor-pointer">
        {!isFirstPage && (
          <li className="mr-1">
            <div
              className="flex items-center border-2 hover:bg-blue-400 hover:text-white px-2 py-2 rounded-full "
              onClick={() => {
                handlePageChange(prevPage);
              }}
            >
              <PreviousIcon height={25} width={25} />
            </div>
          </li>
        )}

        {pages.map((page) => {
          const isCurrentPage = currentPage === page;
          const className = isCurrentPage
            ? 'border-2 bg-blue-400 text-white px-4 py-2 rounded-full'
            : 'border-2 hover:bg-blue-400 hover:text-white px-4 py-2 rounded-full';

          return (
            <li key={page} className="mr-1">
              <div
                className={className}
                onClick={() => {
                  handlePageChange(page);
                }}
              >
                {page}
              </div>
            </li>
          );
        })}

        {!isLastPage && (
          <li className="mr-1">
            <div
              className="flex items-center border-2 hover:bg-blue-400 hover:text-white px-2 py-2 rounded-full"
              onClick={() => {
                handlePageChange(nextPage);
              }}
            >
              <NextIcon height={25} width={25} />
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
