import { Fragment } from 'react';
import type { FC } from 'react';
import Button from '@/src/shared/components/Button';
import Table from '@/src/shared/components/Table';
import Navbar from '@/src/shared/components/Navbar';
import { dropdownItems, navItems } from '@/src/pages/demo/layouts/navbar';

const TableList: FC = () => {
  const tableHeader = [
    'Last Name',
    'First Name',
    'Email',
    'Role',
    'Course Progress',
    'Date Started',
    'Completion Date',
    'Deadline Date',
    'Expiration Date'
  ];
  const tableData = [
    {
      id: 1,
      firstName: 'Villaro',
      lastName: 'Epifanio',
      email: 'villarop@gmail.com',
      role: 'learner',
      courseProgress: 'Not-Started',
      dateStarted: '2023-03-07',
      completionDate: '2023-04-20',
      deadlineDate: '2023-04-20',
      expirationDate: '2023-04-25'
    }
  ];

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <div className="h-screen w-screen flex justify-center pt-64 overflow-auto">
        <div className="w-3/4 h-64 relative overflow-auto">
          <Table header={tableHeader}>
            {tableData.map((col, index) => (
              <tr
                className="border-b whitespace-nowrap text-xl text-black1 font-sans h-5"
                key={col.id}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer"
                  ></input>
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
        </div>
      </div>
    </Fragment>
  );
};

export default TableList;
