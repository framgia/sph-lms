/* eslint-disable multiline-ternary */
import React, { Fragment } from 'react';
import Iframe from '@/src/shared/components/Iframe';
import SidebarContent from '@/src/shared/components/SidebarContent';
import SideBar from '@/src/shared/components/SidebarContent/SideBar';
import type { CourseData } from '@/src/shared/utils';

const ContentSection: React.FunctionComponent<CourseData> = ({ course }: CourseData) => {
  return (
    <Fragment>
      <div className="flex">
        {course?.lessons?.length > 0 ? (
          <SidebarContent>
            {course?.lessons?.map((col) => (
              <SideBar title={col.title} key={col.id}>
                <div className="ml-7 flex-grow w-full">
                  <div className="text-20 font-semibold text-textGray">{col.title}</div>
                  <div className="py-3">
                    <Iframe src={col.link} className="border w-full" />
                  </div>
                </div>
              </SideBar>
            ))}
          </SidebarContent>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-center font-semibold text-xl">No Lesson Available</h1>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ContentSection;
