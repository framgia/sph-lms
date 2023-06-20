import {
  addTrainerCourses,
  resetTrainerCourses,
  seeMoreCourses,
} from '@/src/features/trainer/trainerCourseSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useGetTrainerCourseQuery } from '@/src/services/trainerAPI';
import DashboardCard from '@/src/shared/components/Card/DashboardCard';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import { useEffect } from 'react';

const CoursesSection = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courses, page } = useAppSelector((state) => state.trainerCourse);
  const { data: { results: trainerCourses = [], totalPages } = {}, isLoading } =
    useGetTrainerCourseQuery(page);

  useEffect(() => {
    if (!isLoading && trainerCourses) {
      dispatch(addTrainerCourses(trainerCourses));
    }
  }, [trainerCourses, isLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetTrainerCourses());
    };
  }, []);

  return (
    <div className="p-4 mt-[-1rem]">
      {courses.length ? (
        <div className="flex flex-col gap-4">
          <span className="text-xs text-neutral-disabled">Ranked by progress %</span>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <DashboardCard
                key={course.id}
                title={course.name}
                subText={`${course.lesson_count} ${
                  course.lesson_count !== 1 ? 'lessons' : 'lesson'
                }`}
                link={`/trainer/courses/${course.id}`}
              />
            ))}
          </div>
          {page !== totalPages && (
            <div className="flex gap-1">
              <ShowIcon />
              <button
                className="text-xs underline underline-offset-4"
                onClick={() => {
                  dispatch(seeMoreCourses());
                }}
              >
                See more courses
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center text-sm text-neutral-disabled">
          No courses to show
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
