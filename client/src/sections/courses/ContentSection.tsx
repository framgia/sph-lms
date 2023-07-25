/* eslint-disable multiline-ternary */
import React, { Fragment } from 'react';
import Iframe from '@/src/shared/components/Iframe';
import SidebarContent from '@/src/shared/components/SidebarContent';
import SideBar from '@/src/shared/components/SidebarContent/SideBar';
import type { CourseData } from '@/src/shared/utils';
import { isYoutubeLink } from '@/src/shared/utils/helpers';
import Button from '@/src/shared/components/Button';

const ContentSection: React.FunctionComponent<CourseData> = ({ course }: CourseData) => {
  return (
    <Fragment>
      <div className="flex flex-grow h-full">
        {course?.lessons?.length > 0 ? (
          <SidebarContent>
            {course?.lessons?.map((col) => (
              <SideBar title={col.title} key={col.id}>
                <div className="ml-7">
                  <div className="text-[20px] font-semibold text-textGray">{col.title}</div>
                  <div className="py-3">
                    {isYoutubeLink(col.link) ? (
                      <Iframe src={col.link} className="w-[946px] h-[554px]" />
                    ) : (
                      <Button
                        text="Open Link"
                        buttonClass="border border-red text-red !font-medium text-[14px] px-[18px] py-[6.5px] font-inter m-2 ml-5"
                        onClick={() => window.open(col.link)}
                      />
                    )}
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
