import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { reorderCourses } from '@/src/features/learning-path/learningPathSlice';
import { useStrictDroppable } from '@/src/shared/hooks/useStrictDroppable';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CourseItem from './CourseItem';

const Courses = (): JSX.Element => {
  const {
    values: { courses },
    editMode,
  } = useAppSelector((state) => state.learningPath);
  const dispatch = useAppDispatch();
  const [enabled] = useStrictDroppable(false);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        dispatch(reorderCourses(result));
      }}
    >
      {enabled && (
        <Droppable droppableId="courses" isDropDisabled={!editMode}>
          {(droppableprovided, _) => (
            <div ref={droppableprovided.innerRef} {...droppableprovided.droppableProps}>
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <Draggable
                    isDragDisabled={!editMode}
                    key={course.id}
                    draggableId={course.id.toString()}
                    index={index}
                  >
                    {(provided, _) => (
                      <div
                        ref={provided.innerRef}
                        className="mb-2 w-[70%]"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CourseItem course={course} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p className="text-[14px] text-center w-[70%] text-red">
                  No courses yet, at least one course is required!
                </p>
              )}
              {droppableprovided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default Courses;
