import LearningPathList from '@/src/sections/learning-paths';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Link from 'next/link';
import { useState } from 'react';

const LearningPathListPage: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [inactivePage, setInactivePage] = useState(1);

  const handleSearch = (value: string): void => {
    console.log(value);
  };

  const renderTabContent = (status: boolean): JSX.Element => {
    return (
      <LearningPathList
        isActive={status}
        page={status ? activePage : inactivePage}
        handleChangePageEvent={(page) => {
          status ? setActivePage(page) : setInactivePage(page);
        }}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full pt-4">
        <div className="flex flex-col gap-4 container">
          <div className="flex justify-between items-center mb-3 md:mx-28 lg:mx-24 xl:52 2xl:mx-[13.5rem]">
            <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
            <Link
              href="/trainer/learning-paths/create"
              className="border border-red text-red text-sm h-9 items-center rounded-md font-medium px-4 py-2"
            >
              Create learning path
            </Link>
          </div>
          <div className="mb-3 md:mx-28 lg:mx-24 xl:52 2xl:mx-[13.5rem]">
            <Tabs>
              <Tab title="Active">{renderTabContent(true)}</Tab>
              <Tab title="Inactive">{renderTabContent(false)}</Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningPathListPage;
