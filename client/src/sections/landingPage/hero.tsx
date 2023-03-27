import React from 'react';
import Image from 'next/image';
import type { FC } from 'react';

const Hero: FC = () => {
  return (
    <>
      <div className="flex flex-wrap container p-8 mx-auto xl:px-0">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-lightBlue lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Learning Management System
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Often called an LMS for short, a learning management system is a
              software application that provides the framework that handles all
              aspects of the learning process – it’s where you house, deliver,
              and track your training content. While most often called an LMS,
              other names that might be used is training management system,
              learning activity management system or even learning experience
              platform (LXP).
            </p>

            <div className="flex flex-col items-start space-x-3 space-y-3 sm:space-y-0 sm:items-center sm:flex-row">
              <a className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="hidden lg:block">
            <Image
              src={'/hero_image.jpg'}
              width="616"
              height="617"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
