import { useGetTraineeCourseQuery } from '@/src/services/traineeAPI';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Button from '@/src/shared/components/Button';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import Spinner from '@/src/shared/components/Spinner';
import Container from '@/src/shared/layouts/Container';
import { alertError, type CourseCategory, type Lesson } from '@/src/shared/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, type FC } from 'react';

const TraineeCoursePage: FC = () => {
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
      text: 'Dashboard',
      url: '/trainee/dashboard',
    },
    {
      text: course?.name,
      url: `/trainee/course/${course?.id}`,
    },
  ];

  return (
    <Fragment>
      <div className="ml-5 mt-5">
        <Breadcrumbs paths={paths} />
      </div>
      <Container>
        <div className="grid gap-4 relative mt-5 lg:mx-32 mb-5 cursor-default">
          <div className="relative bg-slate-800 w-full h-[210px]">
            <Image
              src={course?.image ? course?.image : '/image1.jpg'}
              alt={course?.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="">
            <h1 className="text-lg font-bold text-dark pb-1">{course?.name}</h1>
            <p className="text-disabled text-sm font-normal">{course?.description}</p>
          </div>
          <div>
            <h5 className="text-xs text-dark">Categories:</h5>
            <div className="flex mt-1">
              {course?.category.map((category: CourseCategory) => (
                <div
                  key={category?.id}
                  className="text-xs text-disabled font-normal mx-1 px-1 py-1 border border-disabled rounded-full"
                >
                  {category?.name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-1 text-base font-bold text-dark">Course Overview</h3>
            <ul className="bg-neutral-50">
              {course?.lessons.map((lesson: Lesson) => (
                <li key={lesson?.id} className="flex items-center">
                  <input
                    type="checkbox"
                    disabled
                    checked={lesson?.is_completed}
                    className="accent-checkbox m-3 ml-5"
                  />
                  <span className="text-sm text-dark font-semibold opacity-50">
                    {lesson?.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ProgressPercentage progress={course?.progress} />
          </div>
          <div>
            <Link href={`/trainee/course/${course?.id}/training`}>
              <Button
                buttonClass="text-red text-xs px-4 py-2 border border-red"
                text={`${course?.progress ? 'Continue Course' : 'Start Course'}`}
              />
            </Link>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default TraineeCoursePage;
