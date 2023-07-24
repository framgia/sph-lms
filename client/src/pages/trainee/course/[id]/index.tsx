import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import type { Course, DBCourse } from '@/src/shared/utils';
import Container from '@/src/shared/layouts/Container';
import Button from '@/src/shared/components/Button';
import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TraineeCourseProps {
  course: Course | DBCourse;
}

const TraineeCoursePage = ({ course }: TraineeCourseProps): JSX.Element => {
  const categories = ['Javascript', 'TypeScript', 'NodeJS', 'Laravel', 'ReactJS', 'NextJS', 'Django', 'Tailwind'];
  const sections = ['Section 1', 'Section 2', 'Section 3', 'Section 4'];
  const progress = 10;

  const paths = [
    {
      text: 'My Course',
      url: '/trainee/dashboard',
    },
    {
      text: 'Testing Course',
      url: '/trainee/course/1',
    },
  ];

  return (
    <Fragment>
      <div className="ml-5 mt-5">
        <Breadcrumbs paths={paths} />
      </div>
      <Container>
        <div className="grid gap-4 relative mt-5 lg:mx-32 mb-5">
          <div className="relative bg-slate-800 w-full h-[210px]">
            <Image
              src={'/image1.jpg'}
              alt={'Course Image'}
              className=""
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="">
            <h1 className="text-lg font-bold text-dark pb-1">Testing Course</h1>
            <p className="text-disabled text-sm font-normal">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, nihil sint earum
              minus quasi magnam provident expedita facilis. Provident id vitae a fugit praesentium
              sit porro facere sed libero facilis nobis debitis dolor vel minima ea laboriosam, nam
              aut perferendis corrupti? Error dolores numquam quaerat, deleniti, sed laboriosam
              obcaecati at, perspiciatis ullam quibusdam harum? Accusantium, aut? Officia ipsum
              commodi error voluptatem, id corrupti iste animi tempora vitae eveniet minus ducimus
              est architecto nemo nulla? Explicabo incidunt assumenda numquam, inventore eius
              voluptatum tempore neque doloremque corrupti quisquam, omnis autem sint fuga porro
              dignissimos quaerat quae est ullam maxime mollitia modi delectus?
            </p>
          </div>
          <div>
            <h5 className="text-xs text-dark">Categories:</h5>
            <div className="flex mt-1">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="text-xs text-disabled font-normal mx-1 px-1 py-1 border border-disabled rounded-full"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-1 text-base font-bold text-dark">Course Overview</h3>
            <ul className="bg-neutral-50">
              {sections.map((section, index) => (
                <li key={index} className="flex items-center">
                  <input type="checkbox" className='accent-checkbox m-3 ml-5' />
                  <span className="text-sm text-dark font-semibold opacity-50">{section}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ProgressPercentage progress={progress} />
          </div>
          <div>
            <Link href={'#'}>
              <Button
                buttonClass="text-red text-xs px-4 py-2 border border-red"
                text={`${progress ? 'Continue Course' : 'Start Course'}`}
              />
            </Link>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default TraineeCoursePage;
