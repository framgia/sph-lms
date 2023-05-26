/* eslint-disable multiline-ternary */
import React, { Fragment, useEffect, useState } from 'react';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import ArrowIcon from '@/src/shared/icons/ArrowIcon';
import AddLearnerModal from './AddLearnerModal';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import { useGetLearnerQuery } from '@/services/traineeAPI';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/app/hooks';
import { type Trainee, addTrainees, seeMoreTrainees } from '@/features/course/learnerSlice';
import { useSelector } from 'react-redux';
import { type RootState } from '@/app/store';

const LearningSection: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = router.query;
  const courseID = params.id;
  const { trainees, isEnrollee, page } = useSelector((state: RootState) => state.courseLearner);
  const { data: trainee, isLoading } = useGetLearnerQuery({
    courseId: courseID,
    isEnrolled: isEnrollee,
    pageNumber: page,
  });
  const learners = trainees;
  const totalPages = trainee?.learners.total_pages;

  useEffect(() => {
    if (!isLoading && trainee && isEnrollee) {
      dispatch(addTrainees(trainee.learners.data));
    }
  }, [trainee, isLoading, dispatch]);

  const handleSortOptionChange = (value: string): void => {
    setSelectedSortOption(value);
  };

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
    {
      label: 'Progress',
      value: 'progress-high',
      icon: <ArrowIcon className="transform rotate-90" />,
    },
    {
      label: 'Progress',
      value: 'progress-low',
      icon: <ArrowIcon className="transform -rotate-90" />,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const sortLearners = (option: string): CourseLearner[] => {
  //   // please update this function accordingly, since the sorting must come from BE
  //   let sortedLearners: CourseLearner[];
  //   switch (option) {
  //     case 'A - Z':
  //       sortedLearners = [...learners].sort((a, b) => a.firstname.localeCompare(b.firstname));
  //       break;
  //     case 'Z - A':
  //       sortedLearners = [...learners].sort((a, b) => b.firstname.localeCompare(a.firstname));
  //       break;
  //     case 'progress-low':
  //       sortedLearners = [...learners].sort((a, b) => a.progress - b.progress);
  //       break;
  //     case 'progress-high':
  //       sortedLearners = [...learners].sort((a, b) => b.progress - a.progress);
  //       break;
  //     default:
  //       sortedLearners = [...learners];
  //       break;
  //   }
  //   return sortedLearners;
  // };

  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center justify-between mb-8">
          <div className="font-semibold text-sm">List of Learners</div>
          <div>
            <AddLearnerModal />
          </div>
        </div>
        <div className="mx-4 mb-4">
          {/* SORT BUTTON  */}
          <div className="flex text-[15px] my-2 cursor-pointer">
            <SortDropdown
              options={sortOptions}
              onChange={handleSortOptionChange}
              buttonText="Sort by Increasing progress"
              buttonIcon={<FilterIcon />}
            />
          </div>

          <div className={'transition-all duration-500'}>
            {learners?.map((col: Trainee) => (
              <div className="grid gap-1 w-full py-2" key={col.trainee_id}>
                <ProgressPercentage progress={col.progress} />
                <div className="text-sm text-gray-500 font-semibold">
                  {col.firstname} {col.lastname}
                </div>
              </div>
            ))}

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
    </Fragment>
  );
};

export default LearningSection;
