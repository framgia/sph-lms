import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavItemProps {
  url: string;
  text: string;
}

interface NavbarProps {
  navLinks?: NavItemProps[];
}

export const Sections = [
  { url: '/trainer/courses/1/content', text: 'Section 1' },
  { url: '/', text: 'Section 2' },
  { url: '/', text: 'Section 3' },
  { url: '/', text: 'Section 4' }
];

const SidebarContent: React.FC<NavbarProps> = ({ navLinks = Sections }) => {
  const { asPath } = useRouter();

  return (
    <nav className="hidden md:flex grow border-borderBottomColor">
      <ul className="flex flex-col bg-gray1 min-h-[115vh]">
        {navLinks.map((navItem, index) => (
          <li key={index} className="pointer-events-none text-[14px] text-gray2">
            <Link
              className={`flex items-center px-[8px] py-[10px] border-r pointer-events-auto w-full pl-4 ${
                navItem.url === asPath
                  ? 'border-red bg-lightRed text-black2 '
                  : 'border-transparent min-w-[300px]'
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

export default SidebarContent;
