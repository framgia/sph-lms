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

  const activeClass = (currentURL: string, currentIndex: number, totalPaths: number): string => {
    if (asPath === currentURL) {
      return 'text-black2 font-bold pointer-events-none text-sm font-normal';
    } else if (currentIndex === totalPaths - 1) {
      return 'text-gray2 text-sm font-normal hover:underline';
    } else {
      return 'text-gray2 text-sm font-normal hover:underline';
    }
  };

  return (
    <div className='bg-gray1 inline-block p-2 rounded-md'>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center">
          {paths?.map((path, index) => (
            <Fragment key={index}>
              <li>
                <div className="flex items-center mr-1">
                  {index !== 0 && (
                    <div className='text-gray2 mr-1'>/</div>
                  )}
                  <a href={path.url} className={activeClass(path.url, index, paths.length)}>
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
