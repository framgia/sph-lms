import Navbar from '@/src/shared/components/Navbar';
import { Fragment, type ReactNode } from 'react';

export const navItems = [
  { url: '/', text: 'Dashboard', dropdownItems: [] },
  {
    url: '/catalog',
    text: 'Catalog',
    dropdownItems: [
      { text: 'Courses', url: '/catalog/courses' },
      { text: 'Learning Paths', url: '/catalog/learning-paths' }
    ]
  }
];
export const dropdownItems = [
  { text: 'Profile', url: '/profile' },
  { text: 'Settings', url: '/settings' },
  { text: 'Logout', url: '/logout' }
];

const Home = (): ReactNode => {
  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
        <h1 className="text-5xl font-bold mb-10">
          Welcome to the LMS Homepage
        </h1>
        <p className="text-lg font-medium mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit
          ligula at nibh finibus imperdiet. Duis a dolor ac eros ullamcorper
          consequat quis sed quam.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-lg">
          Get Started
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
