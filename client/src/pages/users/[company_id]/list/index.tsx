import { Fragment, useState } from 'react';

import Button from '@/src/shared/components/Button';
import InputField from '@/src/shared/components/InputField';
import Modal from '@/src/shared/components/Modal/Modal';
import Select, { type SelectOptionData } from '@/src/shared/components/Select';
import EditIcon from '@/src/shared/icons/EditIcon';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';

const UsersList: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [validation, setValidation] = useState('');

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleOpenAddModal = (): void => {
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  const ONE = '1';

  const TWO = '2';

  const THREE = '3';

  const options: SelectOptionData[] = [
    { id: 1, text: 'Admin' },
    { id: 2, text: 'Trainer' },
    { id: 3, text: 'Trainee' }
  ];

  const [role, setRole] = useState<typeof ONE | typeof TWO | typeof THREE>(
    ONE
  );

  const handleValueChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRole(event.target.value as typeof ONE | typeof TWO | typeof THREE);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event: { target: { name: any; value: any; }; }): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmitUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let errorMessages = '';
    if (formData.firstName.length === 0 || formData.lastName.length === 0 || formData.email.length === 0) {
      errorMessages = 'Please fill in all required fields.';
    }
    if (errorMessages.length > 0) {
      setValidation(errorMessages);
    } else {
      // TODO: Implement form submission logic here
      setIsConfirmationModalOpen(true);
      setConfirmationMessage('Are you sure you want to create user?'); // Open the confirmation modal
      setValidation(''); // Clear validation error message
    }
  };

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let errorMessages = '';
    if (formData.firstName.length === 0 || formData.lastName.length === 0 || formData.email.length === 0) {
      errorMessages = 'Please fill in all required fields.';
    }
    if (formData.password !== formData.confirmPassword) {
      errorMessages = 'Passwords do not match.';
    }
    if (errorMessages.length > 0) {
      setValidation(errorMessages);
    } else {
      // TODO: Implement form submission logic here
      setIsEditModalOpen(false); // Close modal after form submission
      setIsConfirmationModalOpen(true);
      setConfirmationMessage('Are you sure you want to edit user?');
      setValidation(''); // Clear validation error message
    }
  };

  const handleConfirm = (): void => {
    setIsConfirmationModalOpen(false); // Close the confirmation modal
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleDeleteUser = (): void => {
    // TODO: Implement delete operation here
    setIsConfirmationModalOpen(true); // Open the confirmation modal
    setConfirmationMessage('Are you sure you want to delete user?'); // Set the confirmation message
  };

  return (
    <Fragment>
      <div className='ml-12 mb-12'>
        <Button text='Add User' color='blue' width='20' onClick={handleOpenAddModal} />
        <div onClick={handleOpenEditModal} className='cursor-pointer'>
          <EditIcon />
        </div>
      </div>
      <Modal isOpen={isAddModalOpen}>
        <div className='flex justify-between relative mr-6'>
          <div>
            <h1 className='text-3xl mt-6 ml-6 mb-14'>Add a new User</h1>
          </div>
          <div className='mt-8 mr-4 cursor-pointer' onClick={() => { setIsAddModalOpen(false); }}>
            <XmarkIcon />
          </div>
        </div>
        <form onSubmit={handleSubmitUser}>
          <div className='space-y-6 pb-5'>
            <div>
              <label className='ml-6 text-sm font-bold'>Role</label>
              <div className='mx-6'>
                <Select options={options} value={role} eventHandler={handleValueChange} />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>First Name</label>
              <div className='mx-6'>
                <InputField value={formData.firstName} eventHandler={handleChange} name="firstName" />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>Last Name</label>
              <div className='mx-6'>
                <InputField value={formData.lastName} eventHandler={handleChange} name="lastName" />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>Email</label>
              <div className='mx-6'>
                <InputField value={formData.email} eventHandler={handleChange} name="email" />
              </div>
            </div>
            {(validation.length > 0) && <p className='text-red-500 ml-6 mb-6'>{validation}</p>}
          </div>
          <div className='flex justify-end mr-6'>
            <Button text='Create New User' color='blue' type='submit' />
          </div>
        </form>
      </Modal>
      <Modal isOpen={isEditModalOpen}>
        <div className='flex justify-between relative mr-6'>
          <div>
            <h1 className='text-3xl mt-6 ml-6 mb-14'>John Strong</h1>
          </div>
          <div className='mt-8 mr-4 cursor-pointer' onClick={() => { setIsEditModalOpen(false); }}>
            <XmarkIcon />
          </div>
        </div>
        <form onSubmit={handleSubmitEdit}>
          <div className='space-y-6 pb-5'>
            <div>
              <label className='ml-6 text-sm font-bold'>Role</label>
              <div className='mx-6'>
                <Select options={options} value={role} eventHandler={handleValueChange} />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>Email</label>
              <div className='mx-6'>
                <InputField value={formData.email} eventHandler={handleChange} name="email" />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>First Name</label>
              <div className='mx-6'>
                <InputField value={formData.firstName} eventHandler={handleChange} name="firstName" />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>Last Name</label>
              <div className='mx-6'>
                <InputField value={formData.lastName} eventHandler={handleChange} name="lastName" />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>Password</label>
              <div className='mx-6'>
                <InputField value={formData.password} eventHandler={handleChange} name="password" type='password' />
              </div>
            </div>
            <div>
              <label className='ml-6 text-sm font-bold'>Confirm Password</label>
              <div className='mx-6'>
                <InputField value={formData.confirmPassword} eventHandler={handleChange} name="confirmPassword" type='password' />
              </div>
            </div>
            {(validation.length > 0) && <p className='text-red-500 ml-6 mb-6'>{validation}</p>}
          </div>
          <div className='flex justify-between mx-6'>
            <Button text='Delete User' color='red' onClick={handleDeleteUser} />
            <Button text='Update User' color='blue' type='submit' />
          </div>
        </form>
      </Modal>
      <Modal isOpen={isConfirmationModalOpen}>
        <div className='flex justify-between relative mr-6'>
          <div>
            <h1 className='text-3xl mt-6 ml-6 mb-14'>Confirmation</h1>
          </div>
          <div className='mt-8 mr-4 cursor-pointer' onClick={() => { setIsConfirmationModalOpen(false); }}>
            <XmarkIcon />
          </div>
        </div>
        <div className='text-lg px-6 pb-6'>{confirmationMessage}</div>
        <div className='flex justify-end mr-6'>
          <Button text='Confirm' color='blue' onClick={handleConfirm} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default UsersList;
