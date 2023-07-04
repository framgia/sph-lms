import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import React, { Fragment, useEffect, useState } from 'react';
// import ArrowIcon from '@/src/shared/icons/ArrowIcon';
import {
  addTrainees,
  resetTraineesList,
  seeMoreTrainees,
} from '@/src/features/learning-path/learnerSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useGetLearningPathLearnerQuery } from '@/src/services/traineeAPI';
import Button from '@/src/shared/components/Button';
import { useRouter } from 'next/router';
import AddLearnerModal from '../../../shared/components/Modal/AddLearnerModal';

const LearningPathLearnersSection: React.FC = () => {
  const [selectedSortOption, setSelectedSortOption] = useState('A - Z');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = router.query;
  const courseID = params.id;
  const {
    trainees,
    page,
    selectedSortOption: sortOption,
  } = useAppSelector((state) => state.learningPathLearner);
  const { data: trainee, isLoading } = useGetLearningPathLearnerQuery({
    courseId: courseID,
    isEnrolled: true,
    pageNumber: page,
    selectedSortOption,
  });
  const learners = trainees;
  const totalPages = trainee?.learners.total_pages;

  useEffect(() => {
    if (!isLoading && trainee) {
      dispatch(addTrainees(trainee.learners.data));
    }
  }, [trainee, isLoading, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
    // {
    //   label: 'Progress',
    //   value: 'progress-high',
    //   icon: <ArrowIcon className="transform rotate-90" />,
    // },
    // {
    //   label: 'Progress',
    //   value: 'progress-low',
    //   icon: <ArrowIcon className="transform -rotate-90" />,
    // },
  ];

  const handleSortOptionChange = (option: string): void => {
    setSelectedSortOption(option);
    setSelectedOption(option);
    if (sortOption !== option) {
      dispatch(resetTraineesList(option));
    }
  };

  const handleAddLernerModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    return () => {
      dispatch(resetTraineesList(sortOption));
    };
  }, []);

  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center justify-between mb-8">
          <div className="font-semibold text-sm">List of Learners</div>
          <div>
            <Button
              text="Add learner"
              buttonClass="border border-red text-red text-sm h-9 items-center rounded-md font-medium px-4 py-2"
              textColor="text-red"
              onClick={handleAddLernerModal}
            />
          </div>
        </div>

        {learners?.length > 0 ? (
          <div className="mx-4">
            <div className="flex items-center ml-3 text-[15px] my-2 cursor-pointer">
              <SortDropdown
                options={sortOptions}
                onChange={handleSortOptionChange}
                buttonText={selectedOption ?? 'A - Z'}
                buttonIcon={<FilterIcon />}
                buttonClass="w-auto h-[25px] text-[14px]"
              />
            </div>

            <div className={'px-4 transition-all duration-500'}>
              {learners?.map((col: any) => (
                <div className="grid gap-1 w-full py-2" key={col.id}>
                  <ProgressPercentage progress={col.progress} />
                  <div className="text-sm text-gray-500 font-semibold">
                    {col.firstname} {col.lastname}
                  </div>
                </div>
              ))}
            </div>
            {page !== totalPages && (
              <div className="flex items-center mt-2 mb-5">
                <ShowIcon className="mt-[3px]" />
                <button
                  className="text-[0.77rem] text-gray-600 font-semibold ml-1 underline underline-offset-[3px]"
                  onClick={() => {
                    dispatch(seeMoreTrainees());
                  }}
                >
                  Show More Learners
                </button>
              </div>
            )}
            <div></div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-center font-semibold text-xl">No Learners Available</h1>
          </div>
        )}
        {/* THE MODAL */}
        {isModalOpen && (
          <AddLearnerModal
            handleModal={handleAddLernerModal}
            useGetLearningPathLearnerQuery={useGetLearningPathLearnerQuery}
          />
        )}
      </div>
    </Fragment>
  );
};

export default LearningPathLearnersSection;
