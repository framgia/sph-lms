import { useGetCourseQuery } from '@/services/courseAPI';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Container from '@/src/shared/layouts/Container';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { reset } from '@/features/course/courseSlice';
import LearningPathLearnersSection from '@/src/sections/learning-paths/learningPathLearners';

const CourseContent: React.FC = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { data: course } = useGetCourseQuery(query.id, {
    skip: query.id === undefined,
  });
  const paths = [
    {
      text: 'Learning Paths',
      url: '/trainer/learning-paths',
    },
    {
      text: course?.name,
      url: `/trainer/learning-paths/${course?.id}`,
    },
  ];

  useEffect(() => {
    if (course) {
      dispatch(reset(course));
    }
  }, [course]);

  return (
    <Fragment>
      <div className="ml-5 mt-5">
        <Breadcrumbs paths={paths} />
        <Container className="px-28">
          <div className="text-[20px] font-semibold my-5 text-textGray flex justify-between line-clamp-1">
            <h1>{course?.name}</h1>
          </div>
          <Tabs>
            <Tab title="Content">
              <div>Learning Path Content</div>
            </Tab>
            <Tab title="Learners">
              <LearningPathLearnersSection />
            </Tab>
            <Tab title="Settings">
              <div>Learning Path Settings</div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseContent;
