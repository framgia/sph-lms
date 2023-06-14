import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  changeEditMode,
  reset as learningPathReset,
} from '@/features/learning-path/learningPathSlice';
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

const SettingsSection: FC = () => {
  const { values, editMode } = useAppSelector((state) => state.learningPath);
  const { isTabValid } = useAppSelector((state) => state.tab);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const { asPath, events } = useRouter();

  // Please remove this isActive and replace it with the incoming learning path status in learningPathStatus variable
  const isActive = true;
  const learningPathStatus = isActive ? 'Archive' : 'Activate';

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

  const handleArchive = (): void => {
    // Archive or activate learing path logic goes here
    alert('Archive action has been confirmed');
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

  useEffect(() => {
    const prevPath = asPath;
    events?.on('routeChangeComplete', (newPath) => {
      if (newPath !== prevPath) {
        dispatch(learningPathReset());
      }
    });
  }, []);
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
              {isActive ? 'inactive' : 'active'}.
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
        // Please change this name on integration to the lerning path name
        itemTitle="Learning path"
        onConfirm={handleArchive}
        confirmTitle="Confirm"
      />
    </Fragment>
  );
};

export default SettingsSection;
