import { Fragment, type FC, useEffect, useState } from 'react';
import AddLessonSection from '../create/AddLessonSection';
import InitialSection from '../create/InitialSection';
import Button from '@/src/shared/components/Button';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { changeEditMode } from '@/src/features/course/courseSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { courseSchema } from '@/src/shared/utils/validationSchemas';
import ConfirmationModal from '@/src/shared/components/Modal/ConfirmationModal';
import { useConfirmBeforeLeave } from '@/src/shared/hooks/useConfirmBeforeLeave';
import { useRouter } from 'next/router';
import { useDeleteCourseMutation } from '@/src/services/courseAPI';
import { alertError, alertSuccess } from '@/src/shared/utils';

const SettingsSection: FC = () => {
  const { query } = useRouter();
  const { push } = useRouter();
  const { values, editMode } = useAppSelector((state) => state.course);
  const { isTabValid } = useAppSelector((state) => state.tab);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  useConfirmBeforeLeave(editMode);
  const [deleteCourseMutation] = useDeleteCourseMutation();

  const defaultValues = {
    ...values,
    category: values.category.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
  };

  const {
    register,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
    mode: 'onChange',
    defaultValues,
  });

  const handleDelete = async (): Promise<void> => {
    try {
      const data = {
        ...values,
        category: values.category.map(({ id }) => id),
      };
      const res = await deleteCourseMutation({ courseID: query.id, courseData: data });
      if ('error' in res) {
        throw new Error('Failed to delete course');
      } else {
        await push('/trainer/courses');
        alertSuccess('The course has been deleted');
      }
    } catch (error) {
      alertError('Failed to delete course:');
    }
  };
  useEffect(() => {
    if (!isTabValid) {
      if (values.image) {
        void trigger(['image', 'name', 'category']);
      } else {
        void trigger(['name', 'category']);
      }
    }
  }, [isTabValid]);

  useEffect(() => {
    dispatch(changeEditMode(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [editMode]);

  return (
    <Fragment>
      <InitialSection register={register} errors={errors} control={control} />
      <h3 className="font-medium text-[14px] mb-2 text-textGray">List of lessons</h3>
      <AddLessonSection />
      <div className="mt-4 mb-[146px] space-y-2 w-[70%]">
        <h3 className="text-danger text-[14px] font-medium">Danger Zone</h3>
        <div className="flex justify-between items-center border border-danger p-4 rounded-md text-[12px]">
          <div className="text-textGray">
            <h3 className="font-medium">Delete course</h3>
            <p className="font-normal">
              Once you delete a course, all its content will be removed.
            </p>
          </div>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            text="Delete"
            buttonClass="border border-danger text-danger py-1 px-[18px] rounded-md"
          />
        </div>
      </div>
      <ConfirmationModal
        state={isDeleteModalOpen}
        closeModal={() => {
          setIsDeleteModalOpen(false);
        }}
        item="course"
        itemTitle={values.name}
        onConfirm={handleDelete}
      />
    </Fragment>
  );
};

export default SettingsSection;
