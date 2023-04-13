/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import API from '@/src/apis';
import { useRouter } from 'next/router';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import Modal from '@/src/shared/components/Modal/Modal';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import Button from '@/src/shared/components/Button';
import { type UserCreateFormData } from '@/src/shared/utils';
import { alertError, alertSuccess } from '@/src/shared/utils';

export const roles = [
  { value: '1', label: 'Admin' },
  { value: '3', label: 'Trainer' },
  { value: '4', label: 'Trainee' }
];

export const defaultValues: UserCreateFormData = {
  username: `user_${Math.random().toString(36).substring(2, 8)}`,
  email: '',
  role: '1',
  first_name: '',
  last_name: '',
  password: 'password'
};

export const UserCreate: React.FC = () => {
  const router = useRouter();
  const params = router.query;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCreateFormData>({ defaultValues });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = async (data: UserCreateFormData) => {
    try {
      const response = await API.post(`user/${params.company_id}`, data);
      console.log(response.data);
      alertSuccess('User Successfully Added');
      router.reload();
    } catch (error) {
      console.log(error);
      alertError('Something Went Wrong');
    }
  };

  const handleOpenAddModal = (): void => {
    setIsAddModalOpen(true);
  };

  return (
    <Fragment>
      <div className="pb-10 pt-5">
        <Button
          text="Add User"
          hover="hover:bg-blue-700"
          width="20"
          onClick={handleOpenAddModal}
        />
      </div>
      <Modal isOpen={isAddModalOpen}>
        <div className="flex justify-between relative mx-6">
          <div>
            <h1 className="text-3xl mt-6 mb-14">Add a new User</h1>
          </div>
          <div
            className="mt-8 cursor-pointer"
            onClick={() => {
              setIsAddModalOpen(false);
            }}
          >
            <XmarkIcon />
          </div>
        </div>
        <form className="px-6 pb-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="appearance-none border border-gray-300 rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="role"
              {...register('role', { required: true })}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <RFInputField
              label="First Name"
              {...register('first_name', { required: true, minLength: 2 })}
              error={
                errors.first_name !== undefined &&
                'This field is required and must have at least 2 characters'
              }
            />
          </div>
          <div className="mb-4">
            <RFInputField
              label="Last Name"
              {...register('last_name', { required: true, minLength: 2 })}
              error={
                errors.last_name !== undefined &&
                'This field is required and must have at least 2 characters'
              }
            />
          </div>
          <div className="mb-4">
            <RFInputField
              label="Email"
              type="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: emailRegex,
                  message: 'Invalid email address'
                }
              })}
              error={
                errors.email !== undefined &&
                'This field is required and must be a valid email address'
              }
            />
          </div>
          <div className="flex justify-between">
            <div></div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add User
            </button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default UserCreate;
