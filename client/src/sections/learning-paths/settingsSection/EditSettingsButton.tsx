import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  changeEditMode,
  reset as learningPathReset,
} from '@/src/features/learning-path/learningPathSlice';
import { setIsTabValid } from '@/src/features/tab/tabSlice';
import EditModeButtons from '@/src/shared/components/Button/EditModeButtons';
import { learningPathSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, type FC, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { alertError, alertSuccess } from '@/src/shared/utils';
import {
  useGetLearningPathQuery,
  useUpdateLearningPathMutation,
} from '@/src/services/learningPathAPI';

const EditSettingsButton: FC = () => {
  const { activeTab } = useAppSelector((state) => state.tab);
  const { editMode, values } = useAppSelector((state) => state.learningPath);
  const { query } = useRouter();
  const [updateLearningPath] = useUpdateLearningPathMutation();
  const { data: learningPath } = useGetLearningPathQuery(query.id, {
    skip: query.id === undefined,
  });

  const dispatch = useAppDispatch();
  const defaultValues = {
    ...values,
    category: values.category?.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
    courses: values.courses?.map(({ id, order }) => ({
      course: id,
      order,
    })),
  };

  const { trigger, reset } = useForm({
    resolver: yupResolver(learningPathSchema),
    mode: 'onChange',
    defaultValues,
  });

  const handleCancel = (): void => {
    dispatch(learningPathReset(learningPath));
    dispatch(setIsTabValid(true));
    dispatch(changeEditMode(false));
  };

  const onSave = async (): Promise<void> => {
    let areInputsValid = true;
    if (values.image) {
      areInputsValid = await trigger(['image', 'description', 'name', 'category']);
    } else {
      areInputsValid = await trigger(['name', 'description', 'category']);
    }

    const isValidated = areInputsValid && values?.courses.length > 0;
    dispatch(setIsTabValid(isValidated));

    if (isValidated) {
      try {
        const data = {
          ...values,
          category: values.category.map(({ id }) => id),
          courses: values.courses.map(({ id, order }) => ({
            course: id,
            course_order: order,
          })),
          image:
            typeof values.image === 'string'
              ? '/' + values.image
              : values.image?.name
              ? '/' + values.image.name
              : null,
        };
        const res = await updateLearningPath({ id: query.id, data });
        if ('error' in res) {
          throw new Error('Error updating the learning path');
        } else {
          alertSuccess('The information provided has been saved');
        }
        dispatch(changeEditMode(false));
      } catch (error) {
        alertError(`Error saving the learning path ${error}`);
      }
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [values]);

  return (
    <Fragment>
      {activeTab === 2 && (
        <EditModeButtons
          editMode={editMode}
          onCancel={handleCancel}
          onSave={onSave}
          onEdit={() => dispatch(changeEditMode(true))}
        />
      )}
    </Fragment>
  );
};

export default EditSettingsButton;
