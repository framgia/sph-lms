import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Avatar from '@/src/shared/components/Avatar';
import Dropdown, { type DropdownProps } from '@/src/shared/components/Dropdown';
import NavLink from '@/src/shared/components/NavLink';
import SettingsIcon from '@/src/shared/icons/SettingsIcon';
import LogoutIcon from '@/src/shared/icons/LogoutIcon';
import { getUserFullName, isSignedIn } from '../../utils';
import { useSignOut } from '@/src/shared/hooks/useSignOut';

export interface NavItemProps {
  url: string;
  text: string;
  dropdownItems: Array<{ text: string; url: string }>;
}

export interface NavbarProps {
  navItems: NavItemProps[];
  dropdownItems: DropdownProps['options'];
}

const Navbar: React.FC<NavbarProps> = ({ navItems, dropdownItems }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userSignedIn = isClient && isSignedIn();
  const { onSignOutEvent } = useSignOut();

  return (
    <nav className="bg-gray-100 sticky top-0 z-10">
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
                      {navItem.dropdownItems.length > 0 ? (
                        <Dropdown
                          options={navItem.dropdownItems}
                          label={navItem.text}
                        />
                      ) : (
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
          {userSignedIn ? (
            <div className="flex items-center">
              <Link href={'/settings'} className="text-gray-600">
                <SettingsIcon width={20} height={20} className="mr-2" />
              </Link>
              <Avatar name={getUserFullName()} />
              <Dropdown options={dropdownItems} label={getUserFullName()} />
              <button
                className="flex rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={onSignOutEvent}
              >
                <LogoutIcon />
                <span> Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              {isClient && (
                <Link
                  href="/auth/sign-in"
                  className="bg-slate-300 py-1.5 px-3 text-gray rounded hover:bg-slate-500 hover:text-white"
                >
                  Sign in
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
