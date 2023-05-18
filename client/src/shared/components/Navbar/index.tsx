import { type FC } from 'react';
import Link from 'next/link';
import Avatar from '@/src/shared/components/Avatar';
import Dropdown from '@/src/shared/components/Dropdown';
import { dropdownItems, navItems } from '../../utils/navBarList';
import Logo from './Logo';
import { useRouter } from 'next/router';
import NotificationIcon from '../../icons/NotificationIcon';
export interface NavItemProps {
  url: string;
  text: string;
}

interface NavbarProps {
  navLinks?: NavItemProps[];
}

const Navbar: FC<NavbarProps> = ({ navLinks = navItems }) => {
  const { asPath } = useRouter();

  return (
    <header className="sticky top-0 z-10 px-[64px] flex shadow-sm bg-white text-textGray items-center text-[14px]">
      <Link href="/dashboard">
        <Logo divClass="py-[12px]" />
      </Link>

      <nav className="hidden md:flex grow justify-center">
        <ul className="flex space-x-[32px]">
          {navLinks.map((navItem, index) => (
            <li key={index} className="pointer-events-none">
              <Link
                className={`flex items-center px-[8px] py-[21px] border-b pointer-events-auto ${
                  new RegExp('^' + navItem.url).test(asPath)
                    ? ' border-red bg-lightRed'
                    : 'bg-transparent border-transparent'
                }`}
                href={navItem.url}
              >
                {navItem.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center space-x-2">
        <NotificationIcon />
        <Dropdown options={dropdownItems} showLogoutButton={true}>
          <Avatar />
        </Dropdown>
      </div>
    </header>
  );
};

export default Navbar;
