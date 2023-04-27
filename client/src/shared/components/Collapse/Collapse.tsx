import { useState } from 'react';
import ArrowDown from '../../icons/ArrowDown';
import ArrowUp from '../../icons/ArrowUpIcon';
import ChevronDown from '../../icons/ChevronDownIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import DragIcon from '../../icons/DragIcon';
import EditIcon from '../../icons/EditIcon';

export interface CollapseProps {
  label: string;
  subLabel?: string;
  children?: React.ReactNode;
  classname?: string;
  hasIcon: boolean;
}

const Collapse: React.FC<CollapseProps> = ({
  label,
  subLabel,
  children,
  classname = '',
  hasIcon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleCollapse = (): void => {
    setIsOpen(!isOpen);
  };

  const arrowClasses = isOpen ? 'rotate-180' : '';

  const containerClasses = `pb-2 pt-3 pb-4 rounded relative flex place-items-center ${classname}`;

  const showIcons = isHovered || isOpen;

  return (
    <div className="relative pb-2">
      <div
        className={`absolute left-0 top-0 pt-3 text-blue-500 ${
          showIcons ? 'opacity-100' : 'opacity-20'
        }`}
      >
        <DragIcon />
      </div>
      <div className="ml-7">
        <div
          className={containerClasses}
          onClick={toggleCollapse}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <label className="ml-14 text-base">{label}</label>
          {subLabel != null && (
            <p className="text-xs ml-16 mt-8 absolute text-slate-400">
              {subLabel}
            </p>
          )}

          <div className="flex-1" />
          <div className={`mr-10 ${showIcons ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-center">
              <ArrowUp className="w-5 h-5 ml-3" />
              <ArrowDown className="w-5 h-5 ml-3" />
              <EditIcon classname="w-5 h-5 ml-4" />
              <DeleteIcon className="w-5 h-5 ml-4 text-red-700" />
            </div>
          </div>
          {hasIcon && (
            <ChevronDown
              height={4}
              width={4}
              className={`w-5 h-5 mr-3 ${arrowClasses} text-blue-500`}
            />
          )}
        </div>
        {isOpen && (
          <div className="bg-neutral-100 ">
            <hr className="border mx-7" />
            <div>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

Collapse.defaultProps = {
  label: 'Install XAMPP',
  classname: 'bg-white bold',
  hasIcon: true
};

export default Collapse;
