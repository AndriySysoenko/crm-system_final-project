import React, { FC } from 'react';
import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string | number>;
};

const PaginationComponent:FC<PaginationProps> = ({ currentPage, totalPages, basePath, queryParams = {} }) => {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams({page: page.toString(), ...queryParams });
    return `${basePath}?${params}`};

  const renderPages = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Мало сторінок – показуємо всі
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        // Початок
        pages = [1, 2, 3, 4, 5, 6, 7, '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        // Кінець
        pages = [1, '...'];
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Середина
        pages = [1, '...', currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, '...', totalPages];
      }
    }

    return pages.map((page, index) =>
      page === '...' ? (
        <span key={`dots-${index}`}> ... </span>
      ) : (
        <Link key={page} href={buildUrl(page as number)}>
          <button
            disabled={page === currentPage}
            style={{
              fontWeight: page === currentPage ? 'bold' : 'normal',
              margin: '0 4px',
            }}
          >
            {page}
          </button>
        </Link>
      )
    );
  };

  return (
    <div>
      {/* Кнопка "<" */}
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)}>
          <button>{"<"}</button>
        </Link>
      ) : (
        <button disabled>{"<"}</button>
      )}

      {renderPages()}

      {/* Кнопка ">" */}
      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)}>
          <button>{">"}</button>
        </Link>
      ) : (
        <button disabled>{">"}</button>
      )}
    </div>
  );
};


export default PaginationComponent;