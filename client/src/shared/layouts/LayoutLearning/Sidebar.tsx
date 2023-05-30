import Link from 'next/link';
import React from 'react';
import MenuLogo from '@/src/shared/icons/MenuIcon';

interface Props {
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }: Props) => {
  const items = [
    {
      id: 1,
      title: 'learning',
      content: 'a',
    },
    {
      id: 2,
      title: 'learning',
      content: 'b',
    },
    {
      id: 3,
      title: 'learning',
      content: 'c',
    },
  ];

  return (
    <div className=" w-72 bg-gray-100 h-screen px-4 pt-8 pb-4 bg-light flex flex-col border-solid ">
      <div className="flex flex-row">
        <div className="flex items-center pl-1 pb-1">
          <MenuLogo height={10} width={10} className={''}></MenuLogo>
        </div>
        <div className="pl-4 ">Mongo DB, React</div>
      </div>
      <div className="pt-10 pb-10 text-blue-500 flex flex-row">
        <div>
          <Link href="/"> Dashboard</Link>
        </div>
      </div>
      <div className="pt-4 font-bold">Course Modules</div>
      <div className="pb-1">
        <ul>
          {items.map((item, key) => (
            <div className="border-solid pt-8 " key={item.id}>
              <div className="pl-4 pt-1 pb-1 border-solid bg-indigo-500 text-justify rounded-sm ">
                {item.title}
              </div>
              <div className="pl-4 pt-1 pb-1 border-solid bg-white rounded-sm text-justify ">
                {item.content}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
