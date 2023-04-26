import { useState } from 'react';
import ChevronDown from '../../icons/ChevronDownIcon';

export interface DivCollapseProps {
  label: string;
  children: React.ReactNode;
}

const DivCollapse: React.FC<DivCollapseProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowClasses = isOpen ? 'rotate-180 order-last' : 'order-last';
  const handleAdvanceOption = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <a
        href="#"
        className="flex text-blue-600 text-sm mb-4"
        onClick={handleAdvanceOption}
      >
        {label}
        <ChevronDown
          height={1}
          width={1}
          className={`w-5 h-5 ml-2 mr-5 text-blue-600 ${arrowClasses}`}
        />
      </a>

      <div className={`${isOpen ? 'block' : 'hidden'}`}>{children}</div>
    </div>
  );
};

DivCollapse.defaultProps = {
  label: 'Click to collapse'
};

export default DivCollapse;
