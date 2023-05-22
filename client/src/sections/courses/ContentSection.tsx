/* eslint-disable multiline-ternary */
import React, { Fragment } from 'react';
import Iframe from '@/src/shared/components/Iframe';
import SidebarContent from '@/src/shared/components/SidebarContent';
import SideBar from '@/src/shared/components/SidebarContent/SideBar';

export interface Lesson {
  id: string;
  title: string;
  link: string;
  description: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  lessons: Lesson[];
}

export interface ContentSectionProps {
  course: Course;
}

const ContentSection: React.FunctionComponent<ContentSectionProps> = ({
  course,
}: ContentSectionProps) => {
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
                  <div className="text-14 font-semibold py-2">Description:</div>
                  <div className="text-14 pb-24">
                    {col.description ?? 'No description available'}
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
