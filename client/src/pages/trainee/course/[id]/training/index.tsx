/* eslint-disable multiline-ternary */
import React, { Fragment } from 'react';
import Container from '@/src/shared/layouts/Container';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import SidebarContent from '@/src/shared/components/SidebarContent';
import SideBar from '@/src/shared/components/SidebarContent/SideBar';
import Iframe from '@/src/shared/components/Iframe';
import { useRouter } from 'next/router';
import { useGetTraineeCourseQuery } from '@/src/services/traineeAPI';
import Spinner from '@/src/shared/components/Spinner';
import { type Lesson, alertError } from '@/src/shared/utils';
import { isYoutubeLink } from '@/src/shared/utils/helpers';
import Button from '@/src/shared/components/Button';

const TrainingPage: React.FunctionComponent = () => {
  const { query } = useRouter();
  const { data: course, isLoading, error } = useGetTraineeCourseQuery(query.id);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return alertError('An error occured');
  }

  const paths = [
    {
      text: 'My Courses',
      url: '/trainee/dashboard',
    },
    {
      text: course?.name,
      url: `/trainee/course/${course?.id}`,
    },
  ];
  return (
    <Fragment>
      <Container>
        <div className="ml-5 mt-5">
          <Breadcrumbs paths={paths} />
          <div className="flex flex-grow h-full mt-5">
            <SidebarContent isCheckbox={true}>
              {course?.lessons.map((lesson: Lesson) => (
                <SideBar title={lesson.title} key={lesson.id} is_completed={lesson.is_completed}>
                  <div className="ml-7">
                    <div className="text-[20px] font-semibold text-textGray">
                      {lesson.title} {lesson.id}
                    </div>
                    <div className="py-3">
                      {isYoutubeLink(lesson.link) ? (
                        <Iframe src={lesson.link} className="w-[946px] h-[554px]" />
                      ) : (
                        <Button
                          text="Open Link"
                          buttonClass="border border-red text-red !font-medium text-[14px] px-[18px] py-[6.5px] font-inter m-2 ml-5"
                          onClick={() => window.open(lesson.link)}
                        />
                      )}
                    </div>
                  </div>
                </SideBar>
              ))}
            </SidebarContent>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default TrainingPage;
