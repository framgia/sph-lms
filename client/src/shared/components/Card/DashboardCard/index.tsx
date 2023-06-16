import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  subText: string;
  link: string;
}

const DashboardCard: React.FC<Props> = ({ title, subText, link }: Props) => {
  return (
    <Link href={link}>
      <div className="flex flex-col p-4 border w-auto h-[107px] border-neutral-200 rounded-md hover:border-slate-400 cursor-pointer">
        <span
          className="text-sm leading-[21px] text-neutral-900 font-medium line-clamp-2"
          title={title}
        >
          {title}
        </span>
        <span className="text-xs leading-[18px] text-neutral-disabled font-normal">{subText}</span>
      </div>
    </Link>
  );
};

export default DashboardCard;
