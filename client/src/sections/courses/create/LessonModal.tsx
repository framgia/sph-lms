import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import type { Lesson, LessonForm } from '@/src/shared/utils';
import { lessonSchema } from '@/src/shared/utils/validationSchemas';
import { type FC, useEffect } from 'react';

interface LessonModalProps {
  title: string;
  state: boolean;
  submitButtonTitle?: string;
  initialValues?: Lesson | null;
  closeModal: () => void;
  onSubmit: SubmitHandler<LessonForm>;
}

const LessonModal: FC<LessonModalProps> = ({
  title,
  initialValues,
  state,
  submitButtonTitle = 'Submit',
  closeModal,
  onSubmit,
}) => {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonForm>({
    resolver: yupResolver(lessonSchema),
    mode: 'onChange',
  });

  const formSubmit = (event: LessonForm): void => {
    onSubmit(event);
    reset();
  };

  const handleClose = (): void => {
    closeModal();
    reset();
  };

  useEffect(() => {
    setValue('link', initialValues?.link ?? '');
    setValue('title', initialValues?.title ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Modal className="p-4 !w-[40%]" isOpen={state}>
      <div className="flex items-center justify-between pb-4 mb-4">
        <h2 className="text-[16px] font-bold">{title}</h2>
        <XmarkIcon className="cursor-pointer" onClick={handleClose} />
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="space-y-8">
          <RFInputField
            className="w-full"
            label="Title"
            register={register('title')}
            error={errors.title?.message as string}
          />
          <RFInputField
            className="w-full"
            label="Lesson Link"
            register={register('link')}
            error={errors.link?.message as string}
          />
        </div>
        <div className="flex mt-[48px] justify-end space-x-2 text-[14px]">
          <Button
            onClick={handleClose}
            buttonClass="border border-textGray py-[6px] !px-4"
            text="Cancel"
          />
          <Button
            type="submit"
            buttonClass="border border-red !text-red py-[6px] !w-36"
            text={submitButtonTitle}
          />
        </div>
      </form>
    </Modal>
  );
};

export default LessonModal;
