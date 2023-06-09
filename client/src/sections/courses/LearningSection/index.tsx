/* eslint-disable multiline-ternary */
import React, { Fragment, useEffect, useState } from 'react';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import { useGetLearnerQuery } from '@/services/traineeAPI';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  type Trainee,
  addTrainees,
  seeMoreTrainees,
  resetTraineesList,
} from '@/features/course/learnerSlice';
import Button from '@/src/shared/components/Button';
import Dropdown, { type SortOption } from '@/src/shared/components/Dropdown';
import AddLearnerModal from './AddLearnerModal';

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
            {isModalOpen && <AddLearnerModal closeModal={handleAddMaterialModal} />}

            {/* use this if the reusable add learner modal has working add learner functionality */}
            {/* {isModalOpen && <AddLearnerModal handleHideModal={handleAddMaterialModal} useGetLearnerQuery={useGetLearnerQuery}/>} */}
          </div>
        </div>
        {learners && learners.length > 0 ? (
          <div className="mx-4 mb-4">
            {/* SORT BUTTON  */}
            <div className="flex text-[15px] my-2 cursor-pointer">
              <Dropdown
                options={sortOptions}
                onChange={handleSortOptionChange}
                buttonText={selectedOption ?? 'Sort by Increasing progress'}
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
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h1 className="text-center font-semibold text-xl">No Learners Available</h1>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default LearningSection;
