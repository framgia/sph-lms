import React, { Fragment } from 'react';
import Container from '@/src/shared/layouts/Container';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import { useRouter } from 'next/router';
import { useGetLearningPathQuery } from '@/src/services/traineeAPI';
import LearningPathContentSection from '@/src/sections/learning-paths/ContentSection';
import Spinner from '@/src/shared/components/Spinner';
import { alertError } from '@/src/shared/utils';

const TraineeLearningPath: React.FunctionComponent = () => {
  const { query } = useRouter();

  const {
    data: learningPath,
    isLoading,
    error,
  } = useGetLearningPathQuery(query.id, {
    skip: query.id === undefined,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return alertError('An error occured');
  }

  const paths = [
    {
      text: 'Dashboard',
      url: '/trainee/dashboard',
    },
    {
      text: 'Learning Path Name',
      url: `/trainee/learning-path/${learningPath?.id}`,
    },
  ];
  return (
    <Fragment>
      <div className="ml-5 mt-5">
        <Breadcrumbs paths={paths} />
      </div>
      <Container>
        <LearningPathContentSection learningPath={learningPath} />
      </Container>
    </Fragment>
  );
};

export default TraineeLearningPath;
