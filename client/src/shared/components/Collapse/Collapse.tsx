import useIconStore from '@/src/store/useIconStore';
import { useState } from 'react';
import { useStore } from 'zustand';
import ChevronDown from '../../icons/ChevronDownIcon';
import DeleteIcon from '../../icons/DeleteIcon';

export interface collapseProps {
  label: string;
  subLabel?: string;
  children?: React.ReactNode;
  color?: string;
  bold?: string;
  hasIcon: boolean;
}

const Collapse: React.FC<collapseProps> = ({
  label,
  subLabel,
  children,
  color = '',
  bold = '',
  hasIcon
}) => {
  const { showIcon, toggleIcon } = useStore(useIconStore);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = (): void => {
    setIsOpen(!isOpen);
  };

  const arrowClasses = isOpen ? 'rotate-180 order-last' : 'order-last';

  const containerClasses = `pb-2 pt-3 pb-4 rounded relative flex place-items-center justify-between ${color} ${bold}`;

  console.log(showIcon);

  return (
    <div onMouseEnter={toggleIcon} onMouseLeave={toggleIcon}>
      <div>
        <div className={containerClasses} onClick={toggleCollapse}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 absolute ml-4 mt-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>

          <label className="ml-14 text-base">{label}</label>
          {subLabel != null && (
            <p className="text-xs ml-16 mt-8 absolute text-slate-400">
              {subLabel}
            </p>
          )}
          <div className="grid grid-cols-2 gap-5">
            <div>
              {Boolean(showIcon) && (
                <DeleteIcon className="w-5 h-5 mr-5 red-700" />
              )}
            </div>
            {hasIcon && (
              <ChevronDown
                height={4}
                width={4}
                className={`w-5 h-5 ml-2  ${arrowClasses} `}
              />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="bg-neutral-100 ">
          <hr className="border mx-7" />
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

Collapse.defaultProps = {
  label: 'Install XAMPP',
  color: 'bg-neutral-100',
  hasIcon: true
};

export default Collapse;
