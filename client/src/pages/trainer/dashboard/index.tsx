import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import ArrowIcon from '@/src/shared/icons/ArrowIcon';
import Link from 'next/link';
import { Fragment } from 'react';

const trainer = {
  first_name: 'John',
};

const DashboardPage: React.FC = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center gap-24 w-full pt-24">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="font-semibold text-[32px] leading-[40px] font-lora">
            <span className="text-dark">Welcome back, </span>
            <span className="text-red">Trainer {trainer.first_name}</span>
          </div>
          <div className="flex gap-1 text-sm">
            <span className="font-normal">See the progress of your trainees: </span>
            <Link
              href="/trainer/trainees"
              className="font-medium underline underline-offset-4 decoration-2 decoration-blue"
            >
              Trainees List
            </Link>
          </div>
        </div>
        <div className="flex border-t-[0.5px] w-full justify-center items-start">
          <div className="flex flex-col gap-4 p-4 container w-[962px]">
            <span className="text-dark font-semibold text-2xl font-lora">Overview</span>
            <Tabs>
              <Tab title="My Trainees">
                <div>Trainees Section</div>
              </Tab>
              <Tab title="My Courses">
                <div>Courses Section</div>
              </Tab>
              <Tab title="My Learning Paths">
                <div>Learning Paths Section</div>
              </Tab>
            </Tabs>
          </div>
          <div className="flex flex-col p-2 gap-1 text-dark text-sm">
            <span className="font-medium">Quick Links</span>
            <div className="flex flex-col font-normal">
              <Link href="/trainer/courses/create" className="flex">
                <ArrowIcon className="transform rotate-180" />
                <span>New course</span>
              </Link>
              <Link href="/trainer/learning-paths/create" className="flex">
                <ArrowIcon className="transform rotate-180" />
                <span>New learning path</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;