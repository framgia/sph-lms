/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import type { ReactNode } from 'react';

export interface TableProps<> {
  header: string[];
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ header, children }: TableProps) => {
  return (
    <table className="text-left text-gray-500 dark:text-gray-400">
      <thead>
        <tr>
          <th className="p-4 ">
            <input type="checkbox" className="h-5 w-5 hover:bg-sky-700"></input>
          </th>
          {header.map((item, index) => (
            <th
              className="px-6 py-3 w-auto  whitespace-nowrap text-xl text-lightBlue bg-blueGray"
              key={index}
            >
              {item}
            </th>
          ))}
          <th className="px-6 py-3 w-auto bg-blueGray">{''}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
