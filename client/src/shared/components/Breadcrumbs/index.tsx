/* eslint-disable multiline-ternary */
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

export interface pathObject {
  text: string;
  url: string;
}

export interface BreadcrumbsProps {
  paths: pathObject[];
}

const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  paths
}: BreadcrumbsProps) => {
  const { asPath } = useRouter();

  const activeClass = (currentURL: string): string => {
    return asPath !== currentURL
      ? 'ml-1 text-sm font-medium text-blue-500 hover:underline md:ml-2'
      : 'ml-1 text-sm font-medium text-gray-600 hover:text-gray-300 pointer-events-none';
  };

  return (
    <div>
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {paths?.map((path, index) => (
            <Fragment key={index}>
              <li>
                <div className="flex items-center">
                  {index !== 0 && (
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                  <a href={path.url} className={activeClass(path.url)}>
                    <p className="capitalize">{path.text}</p>
                  </a>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
