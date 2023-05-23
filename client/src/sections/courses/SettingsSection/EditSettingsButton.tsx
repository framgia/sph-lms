/* eslint-disable multiline-ternary */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeEditMode } from '@/features/course/courseSlice';
import { setIsTabValid } from '@/features/tab/tabSlice';
import Button from '@/src/shared/components/Button';
import { courseSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { type FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EditSettingsButton: FC = () => {
  const { activeTab } = useAppSelector((state) => state.tab);
  const { editMode, values } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const defaultValues = {
    ...values,
    category: values.category.map(({ name, id }) => ({
      label: name,
      value: id,
    })),
  };

  const { trigger, reset } = useForm({
    resolver: yupResolver(courseSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSave = async (): Promise<void> => {
    let areInputsValid = true;
    if (values.image) {
      areInputsValid = await trigger(['image', 'name', 'category']);
    } else {
      areInputsValid = await trigger(['name', 'category']);
    }

    const isValidated = areInputsValid && values.lessons.length > 0;
    dispatch(setIsTabValid(isValidated));

    if (isValidated) {
      dispatch(changeEditMode(false));
      // Please place the logic for saving the course edit form here
      alert('The information provided has been saved');
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [values]);
  return (
    <Fragment>
      {activeTab === 2 && (
        <div>
          {editMode ? (
            <div className="flex space-x-1">
              <Button
                onClick={() => dispatch(changeEditMode(false))}
                text="Cancel"
                buttonClass="border border-textGray !font-medium text-[14px] py-[6px] !px-4 "
              />
              <Button
                onClick={onSave}
                text="Save changes"
                buttonClass="border border-red text-red !font-medium text-[14px] px-[18px] py-[6.5px] font-inter"
              />
            </div>
          ) : (
            <Button
              onClick={() => dispatch(changeEditMode(true))}
              text="Edit settings"
              buttonClass="border border-red text-red !font-medium text-[14px] px-[18px] py-[6.5px] font-inter"
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default EditSettingsButton;
