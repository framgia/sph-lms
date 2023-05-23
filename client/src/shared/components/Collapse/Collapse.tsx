/* eslint-disable react/prop-types */
import { useState } from 'react';
import ChevronDown from '../../icons/ChevronDownIcon';

export interface collapseProps {
  label: string;
  subLabel?: string;
  children: React.ReactNode;
}

const Collapse: React.FC<collapseProps> = ({ label, subLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = (): void => {
    setIsOpen(!isOpen);
  };

  const arrowClasses = isOpen ? 'rotate-180 order-last' : 'order-last';

  return (
    <div>
      <div>
        <div
          className="bg-neutral-100 pb-2 pt-3 pb-4 rounded relative flex place-items-center justify-between"
          onClick={toggleCollapse}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 absolute ml-4 mt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>

          <label className="ml-14 text-base">{label}</label>
          {subLabel != null && (
            <p className="text-xs ml-16 mt-8 absolute text-slate-400">{subLabel}</p>
          )}
          <div>
            <ChevronDown height={4} width={4} className={`w-5 h-5 ml-2 mr-5 ${arrowClasses} `} />
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
};

export default Collapse;
