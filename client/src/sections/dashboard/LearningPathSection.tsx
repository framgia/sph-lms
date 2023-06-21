import {
  addTrainerLearningPaths,
  resetTrainerLearningPaths,
  seeMoreLearningPaths,
} from '@/src/features/trainer/trainerLearningPathSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useGetTrainerLearningPathsQuery } from '@/src/services/trainerAPI';
import DashboardCard from '@/src/shared/components/Card/DashboardCard';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import type { TrainerLearningPath } from '@/src/shared/utils';
import React, { useEffect } from 'react';

const LearningPathSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { learningPaths, page } = useAppSelector((state) => state.trainerLearningPath);
  const { data: { results: trainerLearningPaths = [], totalPages = 0 } = {}, isLoading } =
    useGetTrainerLearningPathsQuery({ page, pageSize: 9 });

  useEffect(() => {
    if (!isLoading && trainerLearningPaths) {
      dispatch(addTrainerLearningPaths(trainerLearningPaths));
    }
  }, [trainerLearningPaths]);

  useEffect(() => {
    return () => {
      dispatch(resetTrainerLearningPaths());
    };
  }, []);

  return (
    <div className="mb-20">
      <span className="text-xs text-neutral-disabled pl-5">Ranked by Progress %</span>
      <div className="grid grid-cols-3 gap-4 mx-5 mt-5">
        {learningPaths.map((learningPath: TrainerLearningPath) => (
          <DashboardCard
            key={learningPath.id}
            title={learningPath.name}
            subText={`${learningPath.course_count} ${
              learningPath.course_count === 1 ? 'course' : 'courses'
            }`}
            link={`learning-paths/${learningPath.id}`}
          />
        ))}
      </div>
      {page < totalPages && (
        <div className="flex gap-1 pt-4 pl-4">
          <ShowIcon />
          <span
            className="text-xs underline underline-offset-4 cursor-pointer"
            onClick={() => {
              dispatch(seeMoreLearningPaths());
            }}
          >
            See more learning paths
          </span>
        </div>
      )}
    </div>
  );
};

export default LearningPathSection;
