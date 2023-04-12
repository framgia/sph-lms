/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { Fragment, useState } from 'react';
import type { FC } from 'react';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type ClassFormInputs } from '@/src/shared/utils';

const AddClassModal: FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddClassModal = (): void => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClassFormInputs>();

  const onSubmit: SubmitHandler<ClassFormInputs> = (data: any): void => {
    console.log(data);
  };

  return (
    <Fragment>
      <Button text="Add Class" onClick={handleAddClassModal} />
      <Modal isOpen={isAddModalOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between m-4">
            <h1 className="text-2xl font-bold">Create New Class</h1>
            <Button
              text="X"
              onClick={handleAddClassModal}
              color="bg-inherit"
              textColor="text-black"
            />
          </div>

          <div className="mx-10 mb-10">
            <RFInputField
              label="Class Name"
              {...register('class', { required: true, minLength: 3 })}
              error={
                errors.class !== undefined &&
                'This field is required and must have at least 3 characters'
              }
            />
          </div>

          <div className="flex justify-end mr-4">
            <Button
              text="Cancel"
              onClick={handleAddClassModal}
              color="bg-gray-400"
            />
            <Button text="Create" color="bg-blue-800" type="submit" />
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddClassModal;
