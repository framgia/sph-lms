import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '@/src/shared/components/Navbar';
import Container from '@/src/shared/layouts/Container';
import Table from '@/src/shared/components/Table';
import { dropdownItems, navItems } from '@/src/pages/demo/layouts/navbar';
import API from '@/src/apis';
import { type User } from '@/src/shared/utils';

const EnrollUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let ignore = false;
    async function fetchData (): Promise<void> {
      const result = await API.get('user/1');
      if (!ignore) {
        setUsers(result.data.user);
        console.log(result.data.user);
      }
    }

    void fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <Table
          header={[{ text: 'First Name' }, { text: 'Last Name' }, { text: 'Email' }, { text: 'Role' }]}
        >
         {Array.isArray(users) && users.length > 0
           ? (
               users.map((col: any) => (
                  <tr
                    className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5"
                    key={col.id}
                  >
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.first_name}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.last_name}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.created_at}
                    </td>
                    <td className="px-6 py-4 text-lightBlue underline">
                      {col.email}
                    </td>
                    <td className="px-6 py-4">{col.role.title}</td>
                  </tr>
               ))
             )
           : (
                <tr>
                  <td colSpan={5} className="text-center pt-10 font-bold">
                    <div className="flex justify-center w-full">
                      Loading . . .
                    </div>
                  </td>
                </tr>
             )}
        </Table>
      </Container>
    </Fragment>
  );
};

export default EnrollUser;
