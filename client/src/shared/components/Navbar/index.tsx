import Avatar from '@/src/shared/components/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FC } from 'react';
import { dropdownItems, navItems } from '../../utils/navBarList';
import Logo from './Logo';
// import NotificationIcon from '../../icons/NotificationIcon';
import NavBarDropdown from '../Dropdown/NavBarDropdown';
import { useSession } from 'next-auth/react';
export interface NavItemProps {
  url: string;
  text: string;
}

interface NavbarProps {
  navLinks?: NavItemProps[];
}

const Navbar: FC<NavbarProps> = ({ navLinks = navItems }) => {
  const { asPath } = useRouter();
  const { data: session } = useSession();
  const isTrainer = session?.user.is_trainer;
  const dashBoardLink = `/${isTrainer ? 'trainer' : 'trainee'}/dashboard`;

  return (
    <header className="sticky top-0 z-10 px-[64px] flex shadow-sm bg-white text-textGray items-center text-[14px]">
      <Link href={dashBoardLink}>
        <Logo divClass="py-[12px]" />
      </Link>

      <nav className="hidden md:flex grow justify-center">
        {isTrainer && (
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
        )}
      </nav>

      <div className="flex items-center space-x-2">
        {/* <NotificationIcon /> */}
        <NavBarDropdown options={dropdownItems} showLogoutButton={true}>
          <Avatar src={session?.user?.image} />
        </NavBarDropdown>
      </div>
    </header>
  );
};

export default Navbar;
