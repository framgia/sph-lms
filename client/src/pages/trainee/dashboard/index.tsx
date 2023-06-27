import CoursesSection from '@/src/sections/dashboard/trainee/CoursesSection';
import MyLearningPathSection from '@/src/sections/trainee/MyLearningPathSection';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Fragment>
      <div>
        <div className="flex flex-col gap-2 py-24 justify-center items-center">
          <div className="font-semibold text-[32px] leading-[40px] font-lora">
            <span className="text-dark">Welcome back, </span>
            <span className="text-red">Trainee {session?.user?.first_name}</span>
          </div>
          <div className="flex gap-1 text-sm">
            <span className="font-normal">See where you left off: </span>
            <Link
              href="#"
              className="font-medium underline underline-offset-4 decoration-2 decoration-blue"
            >
              MERN Stack
            </Link>
          </div>
        </div>
        <div className="flex border-t-[0.5px] w-full justify-center items-start">
          <div className="flex flex-col p-4 container w-[1138px]">
            <Tabs>
              <Tab title="My Courses">
                <CoursesSection />
              </Tab>
              <Tab title="My Learning Paths">
                <MyLearningPathSection />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
