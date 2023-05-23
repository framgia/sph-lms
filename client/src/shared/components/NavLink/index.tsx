/* eslint-disable react/prop-types */
import Link from 'next/link';

export interface NavLinkProps {
  href: string;
  text: string;
  classNames?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text, classNames }) => {
  return (
    <Link
      href={href}
      className={`w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ${
        classNames !== undefined ? classNames : ''
      }`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
