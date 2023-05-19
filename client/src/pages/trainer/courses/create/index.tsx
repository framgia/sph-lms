import { type FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Container from '@/src/shared/layouts/Container';
import { courseSchema } from '@/src/shared/utils/validationSchemas';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Stepper from '@/src/shared/components/Stepper';
import Step from '@/src/shared/components/Stepper/Step';
import InitialSection from '@/src/sections/courses/create/InitialSection';
import AddLessonSection from '@/src/sections/courses/create/AddLessonSection';
import PreviewSection from '@/src/sections/courses/create/PreviewSection';
import { setIsStepValid } from '@/features/stepper/stepperSlice';
import { useRouter } from 'next/router';

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

  const onNext = async (): Promise<boolean> => {
    switch (activeStep) {
      case 0:
        if (values.image) {
          return await trigger(['image', 'name', 'category']);
        }
        return await trigger(['name', 'category']);
      case 2:
        /*
            Please collect the form inputs in here, since user is at the preview section, crouseSlice should have all the necessary info we need to save in db

            Please reset the courseSlice and stepperSlice to initial values once the from values are saved in db
        */
        return await push('/trainer/courses');
      default:
        return validateSteps();
    }
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
        <Stepper title="Create course" onNext={onNext}>
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
