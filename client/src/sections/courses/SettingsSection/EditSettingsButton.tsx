/* eslint-disable multiline-ternary */
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { changeEditMode, reset as courseReset } from '@/src/features/course/courseSlice';
import { setIsTabValid } from '@/src/features/tab/tabSlice';
import EditModeButtons from '@/src/shared/components/Button/EditModeButtons';
import { useGetCourseQuery, useUpdateCourseMutation } from '@/src/services/courseAPI';
import { alertError, alertSuccess } from '@/src/shared/utils';
import { courseSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { type FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { objectToFormData } from '@/src/shared/utils/helpers';

const EditSettingsButton: FC = () => {
  const { query } = useRouter();
  const { activeTab } = useAppSelector((state) => state.tab);
  const { editMode, values } = useAppSelector((state) => state.course);
  const [updateCourse] = useUpdateCourseMutation();
  const { data: course } = useGetCourseQuery(query.id, {
    skip: query.id === undefined,
  });

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

  const handleCancel = (): void => {
    dispatch(courseReset(course));
    dispatch(setIsTabValid(true));
    dispatch(changeEditMode(false));
  };

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
      try {
        const data = {
          ...values,
          category: values.category.map(({ id }) => id),
        };
        const formData = objectToFormData(data);
        const res = await updateCourse({ courseID: query.id, courseData: formData });

        if ('error' in res) {
          throw new Error('Failed to update course');
        } else {
          alertSuccess('Course updated successfully');
        }
        dispatch(changeEditMode(false));
      } catch (error) {
        alertError('Failed to update the course. Please try again later.');
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
