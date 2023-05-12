import React from 'react';
// import Navbar from '@/src/shared/components/Navbar';

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

const NavbarPage: React.FC = () => {
  return (
    <div>
      {/* <Navbar navItems={navItems} dropdownItems={dropdownItems} /> */}
    </div>
  );
};

export default NavbarPage;
