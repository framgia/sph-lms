/* eslint-disable react/prop-types */
import { useState } from 'react';
import ChevronDown from '../../icons/ChevronDownIcon';
import FourDotsIcon from '../../icons/FourDotsIcon';
import TrashIcon from '../../icons/TrashIcon';

export interface collapseProps {
  label: string;
  children: React.ReactNode;
  onDelete?: () => void;
}

const Collapse: React.FC<collapseProps> = ({ label, children, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = (): void => {
    setIsOpen(!isOpen);
  };

  const arrowClasses = isOpen ? 'rotate-180 order-last' : 'order-last';

  return (
    <div className="flex flex-col divide-y border border-neutral-200 rounded-[5px]">
      <div className="flex p-4 items-center" onClick={toggleCollapse}>
        <div className="flex gap-1 items-center w-full mr-4">
          <FourDotsIcon />
          <span className="text-sm flex-1">{label}</span>
          {!!onDelete && <TrashIcon
            className="opacity-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />}
        </div>
        <ChevronDown height={16} width={16} className={`${arrowClasses} `} />
      </div>
      {isOpen && <div className="bg-neutral-50 divide-y divide-neutral-200">{children}</div>}
    </div>
  );
};

export default Collapse;
