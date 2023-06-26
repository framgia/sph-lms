import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSession } from 'next-auth/react';

const DashboardPage: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center gap-24 w-full pt-24">
        <div className="flex flex-col gap-2 justify-center items-center">
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
          <div className="flex flex-col gap-4 p-4 container w-[962px]">
            <Tabs>
              <Tab title="My Courses">
                <div>Trainee Courses Section here</div>
              </Tab>
              <Tab title="My Learning Paths">
                <div>Trainee Learning path Section here</div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
