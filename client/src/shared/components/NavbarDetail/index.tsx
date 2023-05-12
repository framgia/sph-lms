import Link from 'next/link';
import { useRouter } from 'next/router';
import { courseDetailItems } from '../../utils/navBarList';

export interface NavItemProps {
  url: string;
  text: string;
}

interface NavbarProps {
  navLinks?: NavItemProps[];
}

const NavbarDetail: React.FC<NavbarProps> = ({ navLinks = courseDetailItems }) => {
  const { asPath } = useRouter();

  return (
    <nav className="hidden md:flex grow border-b border-borderBottomColor">
      <ul className="flex space-x-[10px]">
        {navLinks.map((navItem, index) => (
          <li key={index} className="pointer-events-none">
            <Link
              className={`flex items-center px-[8px] py-[10px] border-b pointer-events-auto ${
                navItem.url === asPath
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

  );
};

export default NavbarDetail;
