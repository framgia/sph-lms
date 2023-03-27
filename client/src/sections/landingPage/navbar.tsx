/* eslint-disable multiline-ternary */
import React from 'react';
import Button from '@/src/shared/components/Button';
import Image from 'next/image';
import type { FC } from 'react';
import Link from 'next/link';

export interface NavItemProps {
  navItems: string[];
}

const Navbar: FC<NavItemProps> = ({ navItems }) => {
  return (
    <nav className="bg-white h-20 sticky top-0">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-row h-16 w-screen pr-10 ">
          <div className="flex items-center">
            <div className="p-10">
              <span>
                <Image
                  src={'/logo.png'}
                  width="100"
                  height="100"
                  alt="Hero Illustration"
                />
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((navItem) => {
                  return (
                    <div
                      key={navItem}
                      className="text-lightBlue text-xl font-semibold cursor-pointer hover:underline"
                    >
                      {navItem}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center  space-x-5 pr-32">
            <div className="pt-4">
              <Link href={'/auth/sign-in'}>
                <button className="mb-4 text-lightBlue font-bold py-2 px-4 rounded  border-2 border-lightBlue">
                  Log In
                </button>
              </Link>
            </div>
            <div className="pt-4">
              <Button text={'Sign Up'} color="#325184"></Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
