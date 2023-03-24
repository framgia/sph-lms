import React from 'react';
import Link from 'next/link';
import Avatar from '@/src/shared/components/Avatar';
import Dropdown, { type DropdownProps } from '@/src/shared/components/Dropdown';
import NavLink from '@/src/shared/components/NavLink';
import SettingsIcon from '@/src/shared/icons/SettingsIcon';

export interface NavItemProps {
  url: string;
  text: string;
  dropdownItems: Array<{ text: string; url: string }>;
}

export interface NavbarProps {
  navItems: NavItemProps[];
  dropdownItems: DropdownProps['options'];
  isSticky?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  dropdownItems,
  isSticky
}) => {
  // this is the flag for the conditional rendering
  const signedIn =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('signedIn') === 'false';

  return (
    <nav
      className={`bg-gray-100 ${isSticky ?? false ? 'sticky top-0' : ''} z-10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-gray-600">
                LMS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((navItem) => {
                  return (
                    <div key={navItem.url}>
                      {navItem.dropdownItems.length > 0
                        ? (
                        <Dropdown
                          options={navItem.dropdownItems}
                          label={navItem.text}
                        />
                          )
                        : (
                        <NavLink
                          href={navItem.url}
                          text={navItem.text}
                        ></NavLink>
                          )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {signedIn
            ? (
            <div className="flex items-center">
              <Link href={'/settings'} className="text-gray-600">
                <SettingsIcon width={20} height={20} className="mr-2" />
              </Link>
              <Avatar name="John Doe" />
              <Dropdown options={dropdownItems} label="John Doe" />
            </div>
              )
            : (
            <div className="flex items-center">
              <Link
                href="/auth/sign-in"
                className="bg-slate-300 py-1.5 px-3 text-gray rounded hover:bg-slate-500 hover:text-white"
              >
                Sign in
              </Link>
            </div>
              )}
        </div>
      </div>
    </nav>
  );
};
Navbar.defaultProps = {
  isSticky: false
};

export default Navbar;
