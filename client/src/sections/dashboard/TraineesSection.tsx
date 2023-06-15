import SortDropdown from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import StudentActivity from '@/src/shared/components/StudentActivity';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import Link from 'next/link';
import React from 'react';

const TraineesSection = (): JSX.Element => {
  return (
    <div className="p-4 text-dark mt-[-1rem]">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <span className="font-medium text-base">My trainees</span>
            <span className="text-xs text-neutral-disabled pt-[3px]">
              ranked by % trainees progress
            </span>
          </div>
          <SortDropdown
            buttonText="A - Z"
            buttonIcon={<FilterIcon />}
            options={[
              { label: 'A - Z', value: 'A - Z' },
              { label: 'Z - A', value: 'Z - A' },
            ]}
            onChange={() => {}}
            buttonClass="w-fit"
          />
        </div>
        <div>
          {[1, 2, 3, 4, 5].map((trainee) => {
            return (
              <Link key={trainee} href={`/trainee/${trainee}`} className='even:bg-neutral-50 block'>
                <StudentActivity />
              </Link>
            );
          })}
        </div>
        <div className="flex gap-1">
          <ShowIcon />
          <span className="text-xs underline underline-offset-4 cursor-pointer">
            See more trainees
          </span>
        </div>
      </div>
    </div>
  );
};

export default TraineesSection;
