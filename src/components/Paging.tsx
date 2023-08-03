import React, { useEffect } from 'react';
type PagingProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Paging: React.FC<PagingProps> = ({ currentPage, totalPages, onPageChange }: PagingProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto">

<li>
        <button
          type="button"
          className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
            first_page
          </span>
        </button>
      </li>

      <li>
        <button
          type="button"
          className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
            navigate_before
          </span>
        </button>
      </li>
      {pageNumbers.map(pageNumber => (
        <li key={pageNumber}>
          <button
            type="button"
            className={`flex justify-center font-semibold px-3.5 py-2 rounded transition ${
              pageNumber === currentPage
                ? 'bg-primary text-white dark:text-white-light dark:bg-primary'
                : 'bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
            navigate_next
          </span>
        </button>
      </li>
      <li>
        <button
          type="button"
          className="flex justify-center font-semibold px-3.5 py-2 rounded transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <span className="material-icons-outlined text-sm text-gray-500  hover:text-gray-700">
            last_page
          </span>
        </button>
      </li>
    </ul>
  );
};

export default Paging;
