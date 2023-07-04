import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { changeEditMode } from '@/src/features/learning-path/learningPathSlice';
import { type FC, Fragment, useEffect, useState } from 'react';
import InitialSection from '../create/InitialSection';
import Button from '@/src/shared/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { learningPathSchema } from '@/src/shared/utils/validationSchemas';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useConfirmBeforeLeave } from '@/src/shared/hooks/useConfirmBeforeLeave';
import AddCourseSection from '../create/AddCourseSection';
import ConfirmationModal from '@/src/shared/components/Modal/ConfirmationModal';
import { alertError, alertSuccess } from '@/src/shared/utils/toastify';
import { useUpdateLearningPathMutation } from '@/src/services/learningPathAPI';

const SettingsSection: FC = () => {
  const { values, editMode } = useAppSelector((state) => state.learningPath);
  const { isTabValid } = useAppSelector((state) => state.tab);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isArchived, setIsArchived] = useState(values.isActive);
  const { query } = useRouter();
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const learningPathStatus = isArchived ? 'Archive' : 'Activate';

  const dispatch = useAppDispatch();
  useConfirmBeforeLeave(editMode);

  const defaultValues = {
    ...values,
    category: values.category?.map(({ name, id }) => ({
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
    resolver: yupResolver(learningPathSchema),
    mode: 'onChange',
    defaultValues,
  });

  const handleArchive = async (): Promise<void> => {
    setIsArchiveModalOpen(false);
    try {
      const updatedData = {
        ...values,
        is_active: !isArchived,
        category: values.category.map(({ id }) => id),
        courses: values.courses.map(({ id, order }) => ({
          course: id,
          order,
        })),
      };
      const res = await updateLearningPath({ id: query.id, data: updatedData });
      if ('error' in res) {
        throw new Error('Error updating the learning path');
      } else {
        setIsArchived(!isArchived);
        alertSuccess('The learning path has been archived');
      }
    } catch (error) {
      alertError(`Error archiving the learning path: ${error}`);
    }
  };

  useEffect(() => {
    if (!isTabValid) {
      if (values.image) {
        void trigger(['image', 'description', 'name', 'category']);
      } else {
        void trigger(['name', 'description', 'category']);
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
      <InitialSection register={register} errors={errors} control={control} showStatus={false} />
      <h3 className="font-medium text-[14px] mb-2 mt-4 text-textGray">List of courses</h3>
      <AddCourseSection />

      <div className="mt-4 mb-[146px] space-y-2 w-[70%]">
        <h3 className="text-danger text-[14px] font-medium">Danger Zone</h3>
        <div className="flex justify-between items-center border border-danger p-4 rounded-md text-[12px]">
          <div className="text-textGray">
            <h3 className="font-medium">{learningPathStatus} learning path</h3>
            <p className="font-normal">
              {learningPathStatus} learning path and set status to{' '}
              {isArchived ? 'inactive' : 'active'}.
            </p>
          </div>
          <Button
            onClick={() => {
              setIsArchiveModalOpen(true);
            }}
            text={learningPathStatus}
            buttonClass="border border-danger text-danger py-1 px-[18px] rounded-md"
          />
        </div>
      </div>
      <ConfirmationModal
        state={isArchiveModalOpen}
        closeModal={() => {
          setIsArchiveModalOpen(false);
        }}
        action={learningPathStatus.toLowerCase()}
        item="learning path"
        itemTitle={values.name}
        onConfirm={handleArchive}
        confirmTitle="Confirm"
      />
    </Fragment>
  );
};

export default SettingsSection;
