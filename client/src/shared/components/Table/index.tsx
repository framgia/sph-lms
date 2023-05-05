/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import HeaderTitle from './HeaderTitle';

export enum TableSortEnum {
  ASC,
  DESC
}
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
  const [sort, setSort] = useState({
    index: -1,
    sortBy: TableSortEnum.ASC
  });

  const handleSortChange = (uid: number): void => {
    setSort((curr) => ({
      index: uid,
      sortBy:
        curr.index === uid
          ? curr.sortBy === TableSortEnum.ASC
            ? TableSortEnum.DESC
            : TableSortEnum.ASC
          : TableSortEnum.ASC
    }));
  };

  return (
    <div className="overflow-auto flex justify-center">
      <table className="text-left text-gray-500 dark:text-gray-400 w-full">
        <thead>
          <tr className="bg-blueGray">
            {checkbox !== false && (
              <th className="p-4 ">
                <input type="checkbox" className="h-5 w-5 hover:bg-sky-700" />
              </th>
            )}
            {header.map((item, index) => (
              <th
                className="px-4 py-3 w-auto  whitespace-nowrap text-sm text-lightBlue"
                key={index}
              >
                <HeaderTitle
                  item={item}
                  index={index}
                  sort={sort}
                  handleSortChange={handleSortChange}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
