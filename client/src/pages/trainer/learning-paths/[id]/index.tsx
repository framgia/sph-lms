import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Container from '@/src/shared/layouts/Container';
import { Fragment, useEffect } from 'react';
import LearningPathLearnersSection from '@/src/sections/learning-paths/LearnersSection';
import LearningPathContentSection from '@/src/sections/learning-paths/ContentSection';
import SettingsSection from '@/src/sections/learning-paths/settingsSection';
import EditSettingsButton from '@/src/sections/learning-paths/settingsSection/EditSettingsButton';
import { useAppDispatch } from '@/src/redux/hooks';
import { reset } from '@/src/features/learning-path/learningPathSlice';
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { settings } from '@/src/pages/api/auth/[...nextauth]';
import API from '@/src/apis';
import type { AxiosError } from 'axios';
import type { LearningPath } from '@/src/shared/utils';
import { useRouter } from 'next/router';

interface LearningPathContentProps {
  learningPath: LearningPath;
}

const LearningPathContent = ({
  learningPath,
}: LearningPathContentProps): JSX.Element | undefined => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const paths = [
    {
      text: 'Learning Paths',
      url: '/trainer/learning-paths',
    },
    {
      text: learningPath?.name,
      url: `/trainer/learning-paths/${learningPath?.id}`,
    },
  ];

  useEffect(() => {
    if (learningPath) {
      dispatch(reset(learningPath));
    }
  }, [learningPath]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [router]);

  return (
    <Fragment>
      <div className="ml-5 mt-5">
        <Breadcrumbs paths={paths} />
        <Container className="px-28">
          <div className="text-[20px] font-semibold my-5 text-textGray flex justify-between line-clamp-1">
            <h1>{learningPath?.name}</h1>
            <EditSettingsButton />
          </div>
          <Tabs>
            <Tab title="Content">
              <LearningPathContentSection learningPath={learningPath} />
            </Tab>
            <Tab title="Learners">
              <LearningPathLearnersSection />
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

export default LearningPathContent;

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
    data = await API.get(`/api/learning-paths/${id}`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.status === 404) {
      return { notFound: true };
    }

    return { props: {}, redirect: { destination: '/500' } };
  }

  return { props: { learningPath: data?.data } };
};
