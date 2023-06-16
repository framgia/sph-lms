import DashboardCard from '@/src/shared/components/Card/DashboardCard';
import ShowIcon from '@/src/shared/icons/ShowIcon';

const CoursesSection = (): JSX.Element => {
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
                subText={`${course.lesson_count} lessons`}
                link={`/trainer/courses/${course.id}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <ShowIcon />
            <span className="text-xs underline underline-offset-4 cursor-pointer">
              See more courses
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-sm text-neutral-disabled">
          No courses to show
        </div>
      )}
    </div>
  );
};

const courses = [
  {
    id: 1,
    name: 'Vue Mastery 1',
    lesson_count: 3,
  },
  {
    id: 2,
    name: 'Vue Mastery 2',
    lesson_count: 4,
  },
  {
    id: 3,
    name: 'Advance Vue Mastery Course For Beginners',
    lesson_count: 3,
  },
  {
    id: 4,
    name: 'Advance Vue Mastery Course For Beginners, Intermediate Learners and Experts',
    lesson_count: 3,
  },
  {
    id: 5,
    name: 'Advance Vue Mastery Course',
    lesson_count: 4,
  },
  {
    id: 6,
    name: 'Advance Vue Mastery Course',
    lesson_count: 3,
  },
  {
    id: 7,
    name: 'Advance Vue Mastery Course',
    lesson_count: 3,
  },
  {
    id: 8,
    name: 'Advance Vue Mastery Course',
    lesson_count: 4,
  },
  {
    id: 9,
    name: 'Advance Vue Mastery Course',
    lesson_count: 3,
  },
];

export default CoursesSection;
