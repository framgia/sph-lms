import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { changeEditMode } from '@/src/features/learning-path/learningPathSlice';
import { setIsTabValid } from '@/src/features/tab/tabSlice';
import EditModeButtons from '@/src/shared/components/Button/EditModeButtons';
import { learningPathSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, type FC, Fragment } from 'react';
import { useForm } from 'react-hook-form';

const EditSettingsButton: FC = () => {
  const { activeTab } = useAppSelector((state) => state.tab);
  const { editMode, values } = useAppSelector((state) => state.learningPath);

  const dispatch = useAppDispatch();
  const defaultValues = {
    ...values,
    category: values.category?.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
  };

  const { trigger, reset } = useForm({
    resolver: yupResolver(learningPathSchema),
    mode: 'onChange',
    defaultValues,
  });

  const handleCancel = (): void => {
    // Please reset the learing path with previously fetched data from BE in the integration
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
      dispatch(changeEditMode(false));
      // Please place the logic for saving the learning path edit form here
      alert('The information provided has been saved');
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
