import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-row justify-center p-10">
        <div className="flex flex-col justify-center space-y-4">
          <div className="text-7xl font-bold font-sans">404</div>
          <div className="text-4xl text-gray-500 font-sans">
            Sorry we couldn&apos;t find this page
          </div>
          <div className="text-2xl">
            But don&apos;t worry, you can find plenty of other things on our
            homepage
          </div>
          <div>
            <div>
              <div className="flex flex-col items-start space-x-3 space-y-3 sm:space-y-0 sm:items-center sm:flex-row">
                <Link
                  href="/"
                  className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
                >
                  GO TO HOMEPAGE
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={'/notfoundpic.png'}
            width="500"
            height="500"
            alt="Hero Illustration"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
