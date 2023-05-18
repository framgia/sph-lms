/* eslint-disable multiline-ternary */
import { useEffect, type FC } from 'react';
import Button from '@/src/shared/components/Button';
import PlusIcon from '@/src/shared/icons/PlusIcon';
import LessonItem from './LessonItem';
import LessonModal from './LessonModal';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { closeModal, lessonModalEnum, openModal } from '@/features/course/lessonModalsSlice';
import { type LessonForm } from '@/src/shared/utils';
import {
  addLesson,
  changeEditMode,
  deleteLesson,
  updateLesson,
} from '@/features/course/courseSlice';
import { v4 as uuidv4 } from 'uuid';
import DeleteModal from '@/src/shared/components/Modal/DeleteModal';

const AddLessonSection: FC = () => {
  const { add, edit, deleteL } = useAppSelector((state) => state.lessonModals);
  const {
    values: { lessons },
    editMode,
  } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  const handleAddSubmit = (event: LessonForm): void => {
    dispatch(closeModal(lessonModalEnum.ADD));
    dispatch(addLesson({ id: uuidv4(), ...event }));
  };

  const handleEditSubmit = (event: LessonForm): void => {
    if (edit) {
      dispatch(updateLesson({ id: edit?.id, ...event }));
      dispatch(closeModal(lessonModalEnum.EDIT));
    }
  };

  const handleDeleteLesson = (): void => {
    if (deleteL) {
      dispatch(deleteLesson(deleteL.id));
      dispatch(closeModal(lessonModalEnum.DELETE));
    }
  };

  useEffect(() => {
    dispatch(changeEditMode(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      {lessons.length > 0 ? (
        lessons.map((lesson) => <LessonItem key={lesson.id} lesson={lesson} />)
      ) : (
        <p className="text-[14px] text-center">No lessons yet, at least one lesson is required!</p>
      )}

      {editMode && (
        <Button
          buttonClass="flex items-center space-x-1 border border-textGray !py-[5px] !px-2 text-[12px]"
          text="Add lesson"
          onClick={() => dispatch(openModal({ type: lessonModalEnum.ADD }))}
        >
          <PlusIcon />
        </Button>
      )}
      <LessonModal
        title="Add new lesson"
        state={add}
        closeModal={() => dispatch(closeModal(lessonModalEnum.ADD))}
        onSubmit={handleAddSubmit}
      />
      <LessonModal
        title="Edit lesson"
        state={edit !== null}
        submitButtonTitle="Save"
        closeModal={() => dispatch(closeModal(lessonModalEnum.EDIT))}
        initialValues={edit}
        onSubmit={handleEditSubmit}
      />
      <DeleteModal
        state={deleteL !== null}
        closeModal={() => dispatch(closeModal(lessonModalEnum.DELETE))}
        type="course"
        title={deleteL?.title ?? ''}
        onDelete={handleDeleteLesson}
      />
    </div>
  );
};

export default AddLessonSection;
