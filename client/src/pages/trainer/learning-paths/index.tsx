import { type TabState } from '@/src/features/tab/tabSlice';
import LearningPathList from '@/src/sections/learning-paths';
import { useGetLearningPathsQuery } from '@/src/services/learningPathAPI';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import { type RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { reset as resetLearningPath } from '@/src/features/learning-path/learningPathSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { useSelector } from 'react-redux';

const LearningPathListPage: React.FC = () => {
  const { data: activeData } = useGetLearningPathsQuery({ page: 1, isActive: true });
  const { data: inactiveData } = useGetLearningPathsQuery({ page: 1, isActive: false });
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [inactivePage, setInactivePage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetLearningPath());
  });
  const activeTab = useSelector<RootState, TabState['activeTab']>((state) => state.tab.activeTab);

  const handleSearch = (search: string): void => {
    setSearch(search);
    setActivePage(1);
    setInactivePage(1);
  };

  const renderTabContent = (status: boolean): JSX.Element => {
    return (
      <LearningPathList
        isActive={status}
        page={status ? activePage : inactivePage}
        search={search}
        handleChangePageEvent={(page) => {
          status ? setActivePage(page) : setInactivePage(page);
        }}
      />
    );
  };

  const hasActiveData = activeData?.results?.length > 0;
  const hasInActiveData = inactiveData?.results?.length > 0;

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center gap-4 w-full pt-4">
        <div className="flex flex-col gap-4 container">
          <div
            className={`flex ${
              (activeTab === 0 && hasActiveData) || (activeTab === 1 && hasInActiveData)
                ? 'justify-between'
                : 'justify-end'
            } items-center md:mx-28 lg:mx-24 xl:52 2xl:mx-[13.5rem]`}
          >
            {(activeTab === 0 && hasActiveData) || (activeTab === 1 && hasInActiveData) ? (
              <SearchBar onSearchEvent={handleSearch} placeholder="Search" />
            ) : null}
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
    </Fragment>
  );
};

export default LearningPathListPage;
