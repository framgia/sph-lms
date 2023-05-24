/* eslint-disable multiline-ternary */
import React, { Fragment, useState } from 'react';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import type { CourseLearner, Learner } from '@/src/shared/utils';
import SortDropdown, {
  type SortOption,
} from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import ArrowIcon from '@/src/shared/icons/ArrowIcon';
import AddLearnerModal from './AddLearnerModal';
import FilterIcon from '@/src/shared/icons/FilterIcon';
import ProgressPercentage from '@/src/shared/components/ProgressPercentage';
import { useGetLearnerQuery } from '@/services/traineeAPI';
import { useRouter } from 'next/router';

const LearningSection: React.FC = () => {
  const [dataLimiter, setDataLimiter] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const router = useRouter();
  const params = router.query;
  const courseID = params.id;

  const { data: trainee } = useGetLearnerQuery({ courseID, maxEntries: dataLimiter });
  const learners = trainee?.learners;

  const staticLearners: Learner[] = [
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
    { id: 19, progress: 23, firstname: 'Elyric2', lastname: 'Manatad' },
  ];

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
  const sortLearners = (option: string): CourseLearner[] => {
    // please update this function accordingly, since the sorting must come from BE
    let sortedLearners: CourseLearner[];
    switch (option) {
      case 'A - Z':
        sortedLearners = [...learners].sort((a, b) => a.firstname.localeCompare(b.firstname));
        break;
      case 'Z - A':
        sortedLearners = [...learners].sort((a, b) => b.firstname.localeCompare(a.firstname));
        break;
      case 'progress-low':
        sortedLearners = [...learners].sort((a, b) => a.progress - b.progress);
        break;
      case 'progress-high':
        sortedLearners = [...learners].sort((a, b) => b.progress - a.progress);
        break;
      default:
        sortedLearners = [...learners];
        break;
    }
    return sortedLearners;
  };

  return (
    <Fragment>
      <div>
        <div className="w-full flex items-center justify-between mb-8">
          <div className="font-semibold text-sm">List of Learners</div>
          <div>
            <AddLearnerModal learners={staticLearners} />
          </div>
        </div>

        {learners?.length > 0 ? (
          <div className="mx-4">
            <div className="flex text-[15px] my-2 cursor-pointer">
              <SortDropdown
                options={sortOptions}
                onChange={handleSortOptionChange}
                buttonText="Sort by Increasing progress"
                buttonIcon={<FilterIcon />}
              />
            </div>

            <div className={'transition-all duration-500'}>
              {learners?.map((col: any) => (
                <div className="grid gap-1 w-full py-2" key={col.trainee_id}>
                  <ProgressPercentage progress={col.progress} />
                  <div className="text-sm text-gray-500 font-semibold">{col.fullname}</div>
                </div>
              ))}
            </div>

                <div className="flex items-center mt-2 mb-5 cursor-pointer">
                  <ShowIcon className="mt-[3px]" />
                  <p
                    className="text-[0.77rem] text-gray-600 font-semibold ml-1 underline underline-offset-[3px]"
                    onClick={() => { setDataLimiter(prevDataLimiter => prevDataLimiter + 10); }}
                  >
                    Show More Learners
                  </p>
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
