/* eslint-disable multiline-ternary */
import {
  addTrainees,
  resetTraineesList,
  seeMoreTrainees,
  type Trainee,
} from '@/src/features/course/learnerSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useGetLearnerQuery } from '@/src/services/traineeAPI';
import Button from '@/src/shared/components/Button';
import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import AddLearnerModal from '@/src/shared/components/Modal/AddLearnerModal';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

const LearningSection: React.FC = () => {
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
  } = useAppSelector((state) => state.courseLearner);
  const { data: trainee, isLoading } = useGetLearnerQuery({
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

  const handleSortOptionChange = (option: string): void => {
    setSelectedSortOption(option);
    setSelectedOption(option);
    if (sortOption !== option) {
      dispatch(resetTraineesList(option));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetTraineesList(sortOption));
    };
  }, []);

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';

  const handleAddMaterialModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center justify-between mb-8">
          <div className="font-semibold text-sm">List of Learners</div>
          <div>
            <Button
              text="Add learner"
              buttonClass="px-4 py-2 text-sm bg-white text-blue-500 border-2 border-red"
              textColor="text-red"
              onClick={handleAddMaterialModal}
            />
          </div>
        </div>
        {learners && learners.length > 0 ? (
          <div className="mx-4 mb-4">
            {/* SORT BUTTON  */}
            <div className="flex text-[15px] my-2 cursor-pointer">
              <SortDropdown
                options={sortOptions}
                onChange={handleSortOptionChange}
                buttonText={selectedOption ?? 'A - Z'}
                buttonIcon={<FilterIcon />}
                buttonClass="w-auto h-[25px] text-[14px]"
              />
            </div>

            <div className={'transition-all duration-500'}>
              {learners?.map((col: Trainee) => (
                <div className="grid gap-1 w-full py-2" key={col.id}>
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
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-center font-semibold text-xl">No Learners Available</h1>
          </div>
        )}
        {isModalOpen && (
          <AddLearnerModal
            handleModal={handleAddMaterialModal}
            useGetLearnerQuery={useGetLearnerQuery}
          />
        )}
      </div>
    </Fragment>
  );
};

export default LearningSection;
