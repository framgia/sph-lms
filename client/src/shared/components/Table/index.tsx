/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import ChevronDown from '../../icons/ChevronDownIcon';

export interface TableHeader {
  text: string;
  onClick?: () => void;
}

export interface TableProps {
  header: TableHeader[];
  checkbox?: boolean;
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({
  header,
  children,
  checkbox
}: TableProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [sortHead, setSortHead] = useState(-1);
  const toggleCollapse = (sortBy: number): void => {
    setSortHead(sortBy);
    if (sortHead === sortBy) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
    }
  };

  const arrowClasses = !isOpen ? 'rotate-180 order-last' : 'order-last';

  return (
    <div className="overflow-auto flex justify-center">
      <table className="text-left text-gray-500 dark:text-gray-400 w-full">
        <thead>
          <tr>
            {checkbox !== false && (
              <th className="p-4 ">
                <input type="checkbox" className="h-5 w-5 hover:bg-sky-700" />
              </th>
            )}
            {header.map((item, index) => (
              <th
                className="px-6 py-3 w-auto  whitespace-nowrap text-sm text-lightBlue bg-blueGray"
                key={index}
              >
                {item.onClick ? (
                  <button
                    type="button"
                    className="flex"
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                        toggleCollapse(index);
                      }
                    }}
                  >
                    {item.text}
                    {sortHead === index && (
                      <ChevronDown
                        height={4}
                        width={4}
                        className={`w-5 h-5 ml-2 mr-5 ${arrowClasses} `}
                      />
                    )}
                  </button>
                ) : (
                  <span>{item.text}</span>
                )}
              </th>
            ))}
            <th className="px-6 py-3 w-auto bg-blueGray"></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
