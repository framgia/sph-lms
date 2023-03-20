import React, { Fragment, useState } from 'react';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import EllipsesHorizontalIcon from '@/src/shared/icons/EllipsesHorizontalIcon';
import Navbar from '@/src/shared/components/Navbar';
import Button from '@/src/shared/components/Button';
import { dropdownItems, navItems } from '@/src/pages/demo/layouts/navbar';

const CourseDetails: React.FC = () => {
  const tabData = [
    { id: 1, tabName: 'Course Content' },
    { id: 2, tabName: 'Knowledge Boosters' },
    { id: 3, tabName: 'Course Settings' },
    { id: 4, tabName: 'Course Layout' },
    { id: 5, tabName: 'Learners' },
    { id: 6, tabName: 'Groups' },
    { id: 7, tabName: 'Assessments' },
    { id: 8, tabName: 'Learning Paths' }
  ];
  const [activeTab, setActiveTab] = useState(1);

  const activateTab = (items: number): void => {
    setActiveTab(items);
  };

  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <div className="top-0 bottom-0 left-30 ml-28 pr-10 pl-32 w-11/12 ">
        <div className="flex flex-col w-11/12">
          <div className="pt-4">
            <Breadcrumbs
              paths={[
                {
                  text: 'Courses',
                  url: '/courses'
                },
                {
                  text: '101 Intro to SkyPrep',
                  url: '/courses/Intro to SkyPrep'
                }
              ]}
            ></Breadcrumbs>
          </div>
          <div className="flex justify-end pr-36">
            <div className="h-8 w-48 border-2 text-lightBlue font-semibold border-lightBlue border-2 flex justify-center rounded-lg">
              Launch Course Preview
            </div>
          </div>
          <div className="flex flex-row pt-10 mx-2">
            <div className="text-2xl font-semibold text-lightBlue">
              101 Intro to SkyPrep
            </div>
            <div className="flex items-center pl-4 cursor-pointer">
              <EllipsesHorizontalIcon
                height={35}
                width={35}
                classname="stroke-lightBlue"
              ></EllipsesHorizontalIcon>
            </div>
          </div>
          <div className="h-screen w-11/12">
            <div className="flex flex-col">
              <div className="flex flex-row border-b-2">
                <div className="border-1 flex flex-row space-x-5 pb-6 pt-10 pl-2 pr-2 h-10 w-auto font font-small text-sm text-gray-600">
                  {tabData.map((items, index) => (
                    <div
                      key={items.id}
                      className={`${
                        activeTab !== items.id
                          ? ''
                          : 'md:underline font-semibold text-lightBlue'
                      } ' cursor-pointer hover:underline underline-offset-1'`}
                      onClick={() => {
                        activateTab(items.id);
                      }}
                    >
                      {items.tabName}
                    </div>
                  ))}
                </div>
                <div className="pb-6 pt-9 h-10 cursor-pointer">
                  <EllipsesHorizontalIcon
                    height={30}
                    width={30}
                    classname="stroke-lightBlue"
                  ></EllipsesHorizontalIcon>
                </div>
              </div>
              <div className="flex justify-end pr-6">
                <Button text={'Add Course Content'} color={'#325184'}></Button>
              </div>
              <div className="flex justify-center items-center h-auto w-auto font font-medium text-xl">
                Content for Tab {activeTab}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseDetails;
