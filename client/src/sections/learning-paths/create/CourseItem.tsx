import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { courseModalEnum, openModal } from '@/src/features/learning-path/courseModalsSlice';
import Collapse from '@/src/shared/components/Collapse/Collapse';
import type { Course } from '@/src/shared/utils';

interface CourseItemProps {
  course: Course;
}

const CourseItem = ({ course }: CourseItemProps): JSX.Element => {
  const { editMode: learningPathEditMode } = useAppSelector((state) => state.learningPath);
  const dispatch = useAppDispatch();
  const { name, lessons } = course;
  return (
    <Collapse
      editMode={learningPathEditMode}
      label={name}
      onDelete={
        learningPathEditMode
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
              <h3 className="text-xs">{lesson.title}</h3>
            </div>
          );
        })}
    </Collapse>
  );
};

export default CourseItem;
