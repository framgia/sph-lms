import {
  addTrainees,
  resetTraineesList,
  seeMoreTrainees,
} from '@/src/features/trainer/dashboard/traineeSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useGetTrainerTraineesQuery } from '@/src/services/traineeAPI';
import SortDropdown from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import StudentActivity from '@/src/shared/components/StudentActivity';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import { type User } from '@/src/shared/utils';
import Link from 'next/link';
import React, { useEffect } from 'react';

const TraineesSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    trainees,
    page,
    selectedSortOption: sortOption,
  } = useAppSelector((state) => state.trainerDashboard);
  const { data, isLoading } = useGetTrainerTraineesQuery({
    sort: sortOption,
    pageSize: 5,
    pageNumber: page,
  });
  const totalPages = data?.totalPages;

  const handleSortOptionChange = (option: string): void => {
    if (sortOption !== option) {
      dispatch(resetTraineesList(option));
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(addTrainees(data.results));
    }
  }, [data, isLoading, dispatch]);

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
            buttonText={sortOption}
            buttonIcon={<FilterIcon />}
            options={[
              { label: 'A - Z', value: 'A - Z' },
              { label: 'Z - A', value: 'Z - A' },
            ]}
            onChange={(value) => {
              handleSortOptionChange(value);
            }}
            buttonClass="w-fit"
          />
        </div>
        <div>
          {trainees?.map((trainee: User) => {
            return (
              <Link
                key={trainee.id}
                href={`/trainee/${trainee.id}`}
                className="even:bg-neutral-50 block"
              >
                <StudentActivity trainee={trainee} />
              </Link>
            );
          })}
        </div>
        <div className="flex gap-1">
          {page !== totalPages && (
            <div className="flex items-center mt-2 mb-5 cursor-pointer">
              <ShowIcon className="mt-[3px]" />
              <p
                className="text-[0.77rem] text-gray-600 font-semibold ml-1 underline underline-offset-[3px]"
                onClick={() => {
                  dispatch(seeMoreTrainees());
                }}
              >
                Show More Learners
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraineesSection;
