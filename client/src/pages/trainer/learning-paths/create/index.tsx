/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { reset } from '@/features/learning-path/learningPathSlice';
import { setIsStepValid } from '@/features/stepper/stepperSlice';
import { useCreateLearningPathMutation } from '@/services/learningPathAPI';
import AddCourseSection from '@/src/sections/learning-paths/create/AddCourseSection';
import InitialSection from '@/src/sections/learning-paths/create/InitialSection';
import PreviewSection from '@/src/sections/learning-paths/create/PreviewSection';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Stepper from '@/src/shared/components/Stepper';
import Step from '@/src/shared/components/Stepper/Step';
import Container from '@/src/shared/layouts/Container';
import { alertError, alertSuccess } from '@/src/shared/utils';
import { learningPathSchema } from '@/src/shared/utils/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LearningPathCreate = (): JSX.Element => {
  const { activeStep } = useAppSelector((state) => state.stepper);
  const { values } = useAppSelector((state) => state.learningPath);
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(learningPathSchema),
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
  const courseLength = values.courses.length;

  const [createLearningPath] = useCreateLearningPathMutation();

  const onNext = async (): Promise<boolean> => {
    switch (activeStep) {
      case 0:
        if (values.image) {
          return await trigger(['image', 'name', 'description', 'category']);
        }
        return await trigger(['name', 'description', 'category']);
      case 2:
        try {
          const formData = {
            ...values,
            category: values.category.map(({ id }) => id),
            courses: values.courses.map(({ id, order }) => {
              return {
                course: id,
                course_order: order,
              };
            }),
            is_active: values.isActive,
            image:
              typeof values.image === 'string'
                ? '/' + values.image
                : values.image?.name
                ? '/' + values.image.name
                : null,
          };

          const res: any = await createLearningPath(formData);
          if ('error' in res) {
            const { data } = res.error;
            const property = Object.keys(data)[0];
            throw new Error(data[property][0]);
          } else {
            alertSuccess('Learning path created successfully!');
            await push('/trainer/learning-paths');
            dispatch(reset());
          }
        } catch (e: any) {
          alertError(e.message);
        }
        break;

      default:
        return validateSteps();
    }
  };

  const validateSteps = (): boolean => {
    switch (activeStep) {
      case 1:
        dispatch(setIsStepValid(courseLength > 0));
        return courseLength > 0;
      default:
        dispatch(setIsStepValid(!errorsLength));
        return !errorsLength;
    }
  };

  useEffect(() => {
    validateSteps();
  }, [errorsLength, courseLength, activeStep]);

  return (
    <div className="mb-20">
      <div className="p-4">
        <Breadcrumbs
          paths={[
            { text: 'Learning Paths', url: '/trainer/learning-paths' },
            { text: 'Create', url: '/trainer/learning-paths/create' },
          ]}
        />
      </div>
      <div>
        <Container>
          <Stepper
            title="Create Learning Path"
            onNext={onNext}
            contentClass={activeStep === 2 ? 'border-none p-0' : ''}
          >
            <Step title="Define your learning path">
              <InitialSection register={register} control={control} errors={errors} />
            </Step>
            <Step title="Add content to your learning path">
              <AddCourseSection />
            </Step>
            <Step title="Review your learning path" nextTitle="Create">
              <PreviewSection />
            </Step>
          </Stepper>
        </Container>
      </div>
    </div>
  );
};

export default LearningPathCreate;
