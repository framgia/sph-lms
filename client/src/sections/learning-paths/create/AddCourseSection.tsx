import React, { useEffect } from 'react';
import Courses from './Courses';
import Button from '@/src/shared/components/Button';
import PlusIcon from '@/src/shared/icons/PlusIcon';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { closeModal, courseModalEnum, openModal } from '@/features/learning-path/courseModalsSlice';
import CourseModal from './CourseModal';
import { changeEditMode, deleteCourse } from '@/features/learning-path/learningPathSlice';
import ConfirmationModal from '@/src/shared/components/Modal/ConfirmationModal';

const AddCourseSection = (): JSX.Element => {
  const { add, deleteC } = useAppSelector((state) => state.courseModals);
  const { editMode } = useAppSelector((state) => state.learningPath);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeEditMode(true));
  }, []);

  const handleDeleteCourse = (): void => {
    if (deleteC) {
      dispatch(deleteCourse(String(deleteC.id)));
      dispatch(closeModal(courseModalEnum.DELETE));
    }
  };

  return (
    <div>
      <Courses />
      {editMode && (
        <Button
          buttonClass="flex items-center space-x-1 border border-textGray !py-[5px] !px-2 text-[12px] !font-medium"
          text="Add course"
          onClick={() => dispatch(openModal({ type: courseModalEnum.ADD }))}
        >
          <PlusIcon />
        </Button>
      )}
      <CourseModal
        title="Add Course"
        state={add}
        closeModal={() => dispatch(closeModal(courseModalEnum.ADD))}
        submitButtonTitle="Add course"
      />
      <ConfirmationModal
        state={!!deleteC}
        closeModal={() => dispatch(closeModal(courseModalEnum.DELETE))}
        item="course"
        itemTitle={deleteC?.name ?? ''}
        onConfirm={handleDeleteCourse}
      />
    </div>
  );
};

export default AddCourseSection;
