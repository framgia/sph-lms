import React, { Fragment } from 'react';
import { useShowPerPage } from '@/src/shared/hooks/useShowPerPage';
import Navbar from '@/src/shared/components/Navbar';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Container from '@/src/shared/layouts/Container';
import Table from '@/src/shared/components/Table';
import { dropdownItems, navItems } from '@/src/pages/demo/layouts/navbar';
import Select from '@/src/shared/components/Select';
import { type UserDetails } from '@/src/shared/utils';

const EnrollUser: React.FC = () => {
  const { paths, showPerPage, showPerPageOption, handleShowPerPage } =
    useShowPerPage();

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <Container>
        <Breadcrumbs paths={paths} />
        <Table
          header={[{ text: 'id' }, { text: 'name' }, { text: 'username' }]}
        >
          {showPerPage.map((item: UserDetails) => (
            <tr
              className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5"
              key={item.id}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 hover:bg-sky-700"
                ></input>
              </td>
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.email}</td>
            </tr>
          ))}
        </Table>
        <div className="flex justify-end">
          <Select
            width="200px"
            eventHandler={handleShowPerPage}
            label="Show Per Page"
            options={showPerPageOption}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default EnrollUser;
