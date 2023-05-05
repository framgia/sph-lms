import React, { Fragment, useState } from 'react';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type MaterialFormInput } from '@/src/shared/utils';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFSelectField from '@/src/shared/components/ReactForm/RFSelectField';

const AddFolderModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MaterialFormInput>();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddMaterialModal = (): void => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const onSubmit: SubmitHandler<MaterialFormInput> = async (
    data: MaterialFormInput
  ): Promise<void> => {
    reset();
    console.log(data);
  };

  const folders = [
    { value: '0', label: 'Nothing Selected' },
    { value: '1', label: 'Example Folder 1' },
    { value: '2', label: 'Example Folder 2' },
    { value: '3', label: 'Example Folder 3' }
  ];

  return (
    <Fragment>
      <Button
        textColor="text-blue-500"
        color="white border border-blue-500"
        text="New Folder"
        onClick={handleAddMaterialModal}
      />

      <Modal className="w-2/3" isOpen={isAddModalOpen}>
        <div className="flex justify-between m-4">
          <h1 className="text-2xl ">Create a Folder</h1>
          <Button
            text="X"
            onClick={handleAddMaterialModal}
            color="bg-inherit"
            textColor="text-black"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="mb-4">
            <RFInputField
              label="Folder Name"
              {...register('name', { required: true, minLength: 5 })}
              error={
                !!errors.name &&
                'This field is required and must have at least 5 characters'
              }
            />

            <RFSelectField
              label="Assign to Folder"
              options={folders}
              {...register('directory')}
            />
          </div>
          <div className="flex justify-end">
            <Button text="Create" color="bg-lightBlue" type="submit" />
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default AddFolderModal;
