/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, Fragment } from 'react';
import API from '@/src/apis';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import RFInputField from '@/src/shared/components/ReactForm/RFInputField';
import RFSelectField from '@/src/shared/components/ReactForm/RFSelectField';
import Modal from '@/src/shared/components/Modal/Modal';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import EditIcon from '@/src/shared/icons/EditIcon';

interface UserUpdateDeleteProps {
  id: number;
}

export interface UserData {
  id: number;
  username: string;
  role_id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
}

export const roles = [
  { value: '1', label: 'Admin' },
  { value: '3', label: 'Trainer' },
  { value: '4', label: 'Trainee' }
];

export const initialUserData = {
  id: 0,
  username: '',
  role_id: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirm_password: ''
};

const UserEditDelete: React.FC<UserUpdateDeleteProps> = ({ id }) => {
  const router = useRouter();
  const params = router.query;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setUserData] = useState<UserData>(initialUserData);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    const password = watch('password');
    const confirmPassword = watch('confirm_password');
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const confirmed = window.confirm(
      'Are you sure you want to update the user data?'
    );
    if (!confirmed) {
      return;
    }
    try {
      await API.put(`user/${params.company_id}/${id}`, data);
      alert('User data updated successfully!');
      router.reload();
    } catch (error) {
      console.log(error);
      alert('Failed to update user data!');
    }
  };

  const deleteUser = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const confirmed = window.confirm(
      'Are you sure you want to delete the user?'
    );
    if (!confirmed) {
      return;
    }
    try {
      await API.delete(`user/${params.company_id}/${id}`);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const [fetchedRoleValue, setFetchedRoleValue] = useState('');

  const handleOpenEditModal = (): void => {
    const fetchData = async () => {
      try {
        const response = await API.get(`user/${params.company_id}/${id}`);
        const userData = response.data;
        setUserData(userData);
        setFetchedRoleValue(userData.role.id);
        reset(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    setIsEditModalOpen(true);
  };

  return (
    <Fragment>
      <div className="cursor-pointer" onClick={handleOpenEditModal}>
        <EditIcon classname="stroke-white"></EditIcon>
      </div>
      <Modal isOpen={isEditModalOpen}>
        <div className="flex justify-between relative mx-6 sticky">
          <div>
            <h1 className="text-3xl mt-6 mb-6">Edit User</h1>
          </div>
          <div
            className="mt-8 cursor-pointer"
            onClick={() => {
              setIsEditModalOpen(false);
            }}
          >
            <XmarkIcon />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6">
          <div className="mb-4">
            <RFSelectField
              label="Role"
              id="role"
              options={roles}
              {...register('role_id', { required: true })}
              error={errors.role_id !== undefined && 'This field is required'}
              value={fetchedRoleValue}
            />
          </div>
          <div className="my-4">
            <RFInputField
              label="Username"
              {...register('username', { required: true, minLength: 5 })}
              error={
                errors.username !== undefined &&
                'This field is required and must have at least 5 characters'
              }
            />
          </div>
          <div className="my-4">
            <RFInputField
              label="Email"
              type="email"
              {...register('email', { required: true })}
              error={errors.email !== undefined && 'This field is required'}
            />
          </div>
          <div className="my-4">
            <RFInputField
              label="First Name"
              {...register('first_name', { required: true, minLength: 2 })}
              error={
                errors.first_name !== undefined &&
                'This field is required and must have at least 2 characters'
              }
            />
          </div>
          <div className="my-4">
            <RFInputField
              label="Last Name"
              {...register('last_name', { required: true, minLength: 2 })}
              error={
                errors.last_name !== undefined &&
                'This field is required and must have at least 2 characters'
              }
            />
          </div>
          <div className="my-4">
            <RFInputField
              label="Password"
              type="password"
              {...register('password', { required: true, minLength: 5 })}
              error={
                errors.password !== undefined &&
                'Please make sure to input correct password'
              }
            />
          </div>
          <div className="my-4">
            <RFInputField
              label="Confirm Password"
              type="password"
              {...register('confirm_password', {
                required: true,
                minLength: 5
              })}
              error={
                errors.confirm_password !== undefined &&
                'Please make sure to input correct password'
              }
            />
          </div>
          <div className="flex items-center">
            <div className="flex-grow"></div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              type="button"
              onClick={deleteUser}
            >
              Delete User
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Edit User
            </button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default UserEditDelete;
