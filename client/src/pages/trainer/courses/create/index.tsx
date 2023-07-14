/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { reset } from '@/src/features/course/courseSlice';
import { setIsStepValid, setLoading } from '@/src/features/stepper/stepperSlice';
import { useCreateCourseMutation } from '@/src/services/courseAPI';
import AddLessonSection from '@/src/sections/courses/create/AddLessonSection';
import InitialSection from '@/src/sections/courses/create/InitialSection';
import PreviewSection from '@/src/sections/courses/create/PreviewSection';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Stepper from '@/src/shared/components/Stepper';
import Step from '@/src/shared/components/Stepper/Step';
import Container from '@/src/shared/layouts/Container';
import { alertError, alertSuccess } from '@/src/shared/utils/toastify';
import { courseSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { objectToFormData } from '@/src/shared/utils/helpers';

const Create: FC = () => {
  const { activeStep } = useAppSelector((state) => state.stepper);
  const { values } = useAppSelector((state) => state.course);
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
    mode: 'onChange',
    defaultValues: {
      ...values,
      category: values.category.map(({ name, id }) => ({
        label: name,
        value: id,
      })),
    },
  });

  const errorsLength = Object.keys(errors).length;
  const lessonLength = values.lessons.length;

  const validateSteps = (): boolean => {
    switch (activeStep) {
      case 1:
        dispatch(setIsStepValid(lessonLength > 0));
        return lessonLength > 0;
      default:
        dispatch(setIsStepValid(!errorsLength));
        return !errorsLength;
    }
  };

  const [createCourse] = useCreateCourseMutation();

  const onNext = async (): Promise<boolean> => {
    switch (activeStep) {
      case 0:
        if (values.image) {
          return await trigger(['image', 'name', 'category']);
        }
        return await trigger(['name', 'category']);
      case 2:
        try {
          const data = {
            ...values,
            category: values.category.map(({ id }) => id),
          };
          const formData = objectToFormData(data);
          dispatch(setLoading(true));
          const res: any = await createCourse(formData);

          if ('error' in res) {
            const { data } = res.error;
            const property = Object.keys(data)[0];
            const errorMessage = data[property];
            throw new Error(errorMessage);
          } else {
            await push('/trainer/courses');
            alertSuccess('Created courses successfully');
            dispatch(reset());
          }
        } catch (e: any) {
          alertError(e.message);
        } finally {
          dispatch(setLoading(false));
        }
        break;
      default:
        return validateSteps();
    }

    return false;
  };

  useEffect(() => {
    validateSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsLength, lessonLength, activeStep]);

  return (
    <main className="text-textGray mb-20">
      <div className="p-[16px]">
        <Breadcrumbs
          paths={[
            { text: 'Courses', url: '/trainer/courses' },
            { text: 'Create', url: '/trainer/courses/create' },
          ]}
        />
      </div>
      <Container>
        <Stepper
          title="Create course"
          onNext={onNext}
          contentClass={activeStep === 2 ? 'border-none p-0' : ''}
        >
          <Step title="Define your course">
            <InitialSection register={register} errors={errors} control={control} />
          </Step>
          <Step title="Add and modify content in your course">
            <AddLessonSection />
          </Step>
          <Step title="Review your course" nextTitle="Create">
            <PreviewSection />
          </Step>
        </Stepper>
      </Container>
    </main>
  );
};

export default Create;
