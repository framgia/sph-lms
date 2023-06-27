import ContentSection from '@/src/sections/courses/ContentSection';
import SettingsSection from '@/src/sections/courses/SettingsSection';
import EditSettingsButton from '@/src/sections/courses/SettingsSection/EditSettingsButton';
import LearningSection from '@/src/sections/courses/LearningSection/index';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Container from '@/src/shared/layouts/Container';
import { Fragment, useEffect } from 'react';
import { useAppDispatch } from '@/src/redux/hooks';
import { reset } from '@/src/features/course/courseSlice';
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import API from '@/src/apis';
import type { AxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import { settings } from '@/src/pages/api/auth/[...nextauth]';

const CourseContent = ({ course }: { course: any }): JSX.Element | undefined => {
  const dispatch = useAppDispatch();

  const paths = [
    {
      text: 'Course',
      url: '/trainer/courses',
    },
    {
      text: course?.name,
      url: `/trainer/courses/${course?.id}`,
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
            <EditSettingsButton />
          </div>
          <Tabs>
            <Tab title="Content">
              <ContentSection course={course} />
            </Tab>
            <Tab title="Learners">
              <LearningSection />
            </Tab>
            <Tab title="Settings">
              <SettingsSection />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseContent;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params as Record<string, any>;

  const session = await getServerSession(
    context.req,
    context.res,
    settings(context.req as NextApiRequest, context.res as NextApiResponse)
  );

  let data;
  try {
    data = await API.get(`/api/course/${id}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 404) {
      return { notFound: true };
    }
  }

  return { props: { course: data?.data } };
};
