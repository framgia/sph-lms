import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { courseModalEnum, openModal } from '@/features/learning-path/courseModalsSlice';
import Collapse from '@/src/shared/components/Collapse/Collapse';
import FourDotsIcon from '@/src/shared/icons/FourDotsIcon';
import type { Course } from '@/src/shared/utils';

interface CourseItemProps {
  course: Course;
}

const CourseItem = ({ course }: CourseItemProps): JSX.Element => {
  const { editMode } = useAppSelector((state) => state.learningPath);
  const dispatch = useAppDispatch();
  const { name, lessons } = course;
  return (
    <Collapse
      label={course.name}
      onDelete={
        editMode
          ? () => {
              dispatch(openModal({ type: courseModalEnum.DELETE, course }));
            }
          : undefined
      }
    >
      {lessons.length > 0 &&
        lessons.map((lesson) => {
          return (
            <div key={lesson.id} className="flex gap-1 items-center w-full py-4 px-6">
              <FourDotsIcon />
              <h3 className="text-xs">{lesson.title}</h3>
            </div>
          );
        })}
    </Collapse>
  );
};

export default CourseItem;
