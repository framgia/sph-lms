import Button from '@/src/shared/components/Button';
import React, { Fragment, useState } from 'react';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import UnShowIcon from '@/src/shared/icons/UnShowIcon';
import type { Learner } from '@/src/shared/utils';
import SortDropdown, { type SortOption } from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import ArrowIcon from '@/src/shared/icons/ArrowIcon';
import AddLearnerModal from './AddLearnerModal';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';

const LearningSection: React.FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const learners: Learner[] = [
    { id: 1, progress: 23, firstname: 'Elyric', lastname: 'Manatad' },
    { id: 2, progress: 100, firstname: 'John', lastname: 'Doe' },
    { id: 3, progress: 57, firstname: 'Francis', lastname: 'Delos Santos' },
    { id: 4, progress: 85, firstname: 'Vali', lastname: 'Ruziboev' },
    { id: 5, progress: 97, firstname: 'Mel Anthony', lastname: 'Ando' },
    { id: 6, progress: 75, firstname: 'Zion Keenen', lastname: 'Tavera' },
    { id: 7, progress: 40, firstname: 'Rene Angelo', lastname: 'Gunayon' },
    { id: 8, progress: 72, firstname: 'Jason', lastname: 'Chua' },
    { id: 9, progress: 63, firstname: 'EJ', lastname: 'Potot' },
    { id: 10, progress: 12, firstname: 'Johny', lastname: 'Shen' },
    { id: 11, progress: 12, firstname: 'Johny2', lastname: 'Shen' },
    { id: 12, progress: 63, firstname: 'EJ2', lastname: 'Potot' },
    { id: 13, progress: 72, firstname: 'Jason2', lastname: 'Chua' },
    { id: 14, progress: 40, firstname: 'Rene Angelo2', lastname: 'Gunayon' },
    { id: 15, progress: 75, firstname: 'Zion Keenen2', lastname: 'Tavera' },
    { id: 16, progress: 97, firstname: 'Mel Anthony2', lastname: 'Ando' },
    { id: 17, progress: 85, firstname: 'Vali2', lastname: 'Ruziboev' },
    { id: 18, progress: 57, firstname: 'Francis2', lastname: 'Delos Santos' },
    { id: 19, progress: 23, firstname: 'Elyric2', lastname: 'Manatad' }
  ];

  const handleModalClose = (): void => {
    setIsModalOpen(false);
  };

  const handleSeeMore = (): void => {
    setShowMore(!showMore);
  };

  const handleSortOptionChange = (value: string): void => {
    setSelectedSortOption(value);
  };

  const sortOptions: SortOption[] = [
    { label: 'A - Z', value: 'A - Z' },
    { label: 'Z - A', value: 'Z - A' },
    {
      label: 'Progress',
      value: 'progress-high',
      icon: <ArrowIcon className="transform rotate-90" />
    },
    {
      label: 'Progress',
      value: 'progress-low',
      icon: <ArrowIcon className="transform -rotate-90" />
    }
  ];

  const sortLearners = (option: string): Learner[] => {
    switch (option) {
      case 'A - Z':
        return learners.sort((a, b) => a.firstname.localeCompare(b.firstname));
      case 'Z - A':
        return learners.sort((a, b) => b.firstname.localeCompare(a.firstname));
      case 'progress-low':
        return learners.sort((a, b) => a.progress - b.progress);
      case 'progress-high':
        return learners.sort((a, b) => b.progress - a.progress);
      default:
        return learners;
    }
  };

  const sortedLearners = sortLearners(selectedSortOption);
  const visibleLearners = showMore ? sortedLearners : sortedLearners.slice(0, 9);

  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center justify-between mb-8">
          <div className="font-semibold text-sm">List of Learners</div>
          <Button
            text="Add learner"
            buttonClass="px-4 py-2 text-sm bg-white text-blue-500 border-2 border-red"
            textColor="text-red"
            onClick={() => { setIsModalOpen(true); } }
          />
        </div>
        <div className="mx-4">
          {/* SORT BUTTON  */}
          <div className="flex text-[15px] my-2 cursor-pointer">
            <SortDropdown options={sortOptions} onChange={handleSortOptionChange} buttonText="Sort by Increasing progress" buttonIcon={<FilterIcon />} />
          </div>

          {/* LIST OF LEARNERS */}
          <div className={'transition-all duration-500'}>
            {visibleLearners.map((learner, index) => (
              <div className="grid gap-1 w-full py-2" key={index}>
                <ProgressPercentage progress={learner.progress} />
                <div className="text-sm text-gray-500 font-semibold">
                  {learner.firstname + ' ' + learner.lastname}
                </div>
              </div>
            ))}
          </div>

          {/* SEE LEARNERS PAGINATION */}
          <div className="flex items-center mt-2 mb-5 cursor-pointer">
            {showMore ? <UnShowIcon className="mt-[3px]" /> : <ShowIcon className="mt-[3px]" />}

            <p
              className="text-[0.77rem] text-gray-600 font-semibold ml-1 underline underline-offset-[3px]"
              onClick={handleSeeMore}
            >
              {showMore ? 'See less learners' : 'See more learners'}
            </p>
          </div>
        </div>

        {/* ADD LEARNER MODAL  */}
        <div>
          <AddLearnerModal
            isOpen={isModalOpen}
            handleModalClose={handleModalClose}
            learners={learners}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default LearningSection;
