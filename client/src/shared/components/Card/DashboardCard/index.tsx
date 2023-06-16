import React from 'react';

interface Props {
  title: string;
  subText: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<Props> = ({ title, subText, onClick }: Props) => {
  return (
    <div
      className="border-2 w-[288px] h-[106px] border-neutral-200 rounded-[5px] hover:border-slate-400 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-[14px] pl-4 pt-4 text-neutral-900 font-medium">{title}</h3>
      <p className="pl-4 pt-1 text-[12px] text-neutral-disabled">{subText}</p>
    </div>
  );
};

export default DashboardCard;
