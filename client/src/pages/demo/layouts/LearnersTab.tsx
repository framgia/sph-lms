/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import table from '@/src/pages/demo/components/data.json';

import Container from '@/src/shared/layouts/Container';

import SelectionModal from '@/src/shared/components/SelectionModal';
import Table from '@/src/shared/components/Table';
import Button from '@/src/shared/components/Button';
import { dropdownItems, navItems } from '../../demo/layouts/navbar';
import Navbar from '@/src/shared/components/Navbar';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';

const LearnersTab: React.FC = () => {
  const tableHeader = [
    { text: 'Last Name' },
    { text: 'First Name' },
    { text: 'Role' },
    { text: 'Course Progress' },
    { text: 'Date Started' },
    { text: 'Completion Date' },
    { text: 'Deadline Date' },
    { text: 'Expiration Date' }
  ];
  const tableData = table.tableData;

  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const handleCheck = (id: string, checked: boolean): void => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    }
  };

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <Breadcrumbs
          paths={[
            {
              text: 'Courses',
              url: '/courses'
            },
            {
              text: '101 Intro to SkyPrep',
              url: router.asPath
            }
          ]}
        />
        <h1 className="text-2xl mt-10 pb-10">101 Intro to SkyPrep</h1>
        <Table header={tableHeader}>
          {tableData.map((col: any) => (
            <tr
              className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5"
              key={col.id}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes(col.id)}
                  onChange={(event) => {
                    handleCheck(col.id, event.target.checked);
                  }}
                />
              </td>
              <td className="px-6 py-4">{col.firstName}</td>
              <td className="px-6 py-4">{col.lastName}</td>
              <td className="px-6 py-4">{col.email}</td>
              <td className="px-6 py-4">{col.role}</td>
              <td className="px-6 py-4">{col.courseProgress}</td>
              <td className="px-6 py-4">{col.dateStarted}</td>
              <td className="px-6 py-4">{col.completionDate}</td>
              <td className="px-6 py-4">{col.deadlineDate}</td>
              <td className="px-6 py-4">{col.expirationDate}</td>
              <td>
                <Button
                  text="Actions"
                  color="#325184"
                  onClick={() => {
                    alert('Actions');
                  }}
                />
              </td>
            </tr>
          ))}
        </Table>
        {checkedItems.length > 0 && (
          <SelectionModal
            numSelected={checkedItems.length}
            selectedNames={tableData
              .filter((col: any) => checkedItems.includes(col.id))
              .map((col: any) => `${col.firstName} ${col.lastName}`)}
          />
        )}
      </Container>
    </Fragment>
  );
};

export default LearnersTab;
