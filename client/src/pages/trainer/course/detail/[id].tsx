import React, { Fragment } from 'react';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import EllipsesHorizontalIcon from '@/src/shared/icons/EllipsesHorizontalIcon';
import Navbar from '@/src/shared/components/Navbar';
import Button from '@/src/shared/components/Button';
import { dropdownItems, navItems } from '@/src/pages/demo/layouts/navbar';
import CourseSetting from '@/src/shared/layouts/CourseSettingTab';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';

const CourseDetails: React.FC = () => {
  const tabHeaders = [
    'Course Settings',
    'Course Layout',
    'Learners',
    'Groups',
    'Assessments',
    'Learning Paths'
  ];

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
            <div className="h-8 w-48 border-2 text-lightBlue font-semibold border-lightBlue flex justify-center rounded-lg">
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
              <div>
                <Tabs>
                  {tabHeaders.map((title, index) => {
                    switch (title) {
                      case 'Course Settings':
                        return (
                          <Tab key={index} title="Course Settings">
                            <div>
                              <div className="flex justify-end pr-6">
                                <Button
                                  text={'Add Course Content'}
                                  color={'bg-lightBlue'}
                                ></Button>
                              </div>
                              <div className="flex h-auto w-auto font font-medium">
                                <CourseSetting />
                              </div>
                            </div>
                          </Tab>
                        );
                      default:
                        return (
                          <Tab key={index} title={title}>
                            <div></div>
                          </Tab>
                        );
                    }
                  })}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseDetails;
