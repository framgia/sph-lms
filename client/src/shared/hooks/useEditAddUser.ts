import { useState } from 'react';

import { type SelectOptionData } from '../components/Select';

const useEditAddUser = (): any => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const [errorFistName, setErrorFistName] = useState('');

  const [errorLastName, setErrorLastName] = useState('');

  const [errorEmail, setErrorEmail] = useState('');

  const [errorPassword, setErrorPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

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
    setErrorFistName('');
    setErrorLastName('');
    setErrorEmail('');
    setErrorPassword('');
    setConfirmPassword('');
  };

  const handleSubmitUser = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (formData.firstName.length === 0) {
      setErrorFistName('First Name should not be empty');
    }
    if (formData.lastName.length === 0) {
      setErrorLastName('Last Name should not be empty');
    }
    if (formData.email.length === 0) {
      setErrorEmail('Email should not be empty');
    } else
    if (
      formData.firstName.length === 1) {
      setErrorFistName('First Name should be at least 2 or more characters');
    } else
    if (
      formData.lastName.length === 1) {
      setErrorLastName('Last Name should be at least 2 or more characters');
    } else {
      setIsConfirmationModalOpen(true);
      setConfirmationMessage('Are you sure you want to create user?');
    }
  };

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (formData.firstName.length === 0) {
      setErrorFistName('First Name should not be empty');
    }
    if (formData.lastName.length === 0) {
      setErrorLastName('Last Name should not be empty');
    }
    if (formData.email.length === 0) {
      setErrorEmail('Email should not be empty');
    }
    if (
      formData.firstName.length === 1) {
      setErrorFistName('First Name should be at least 2 or more characters');
    } else
    if (
      formData.lastName.length === 1) {
      setErrorLastName('Last Name should be at least 2 or more characters');
    } else if (
      formData.password.length < 5) {
      setErrorPassword('Password must be at least 5 or more characters');
    } else
    if (
      formData.password !== formData.confirmPassword) {
      setConfirmPassword('Passwords do not match');
    } else {
      setIsConfirmationModalOpen(true);
      setConfirmationMessage('Are you sure you want to create user?');
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
  return {
    isAddModalOpen,
    isEditModalOpen,
    isConfirmationModalOpen,
    confirmationMessage,
    handleOpenAddModal,
    handleOpenEditModal,
    options,
    role,
    handleValueChange,
    handleChange,
    handleSubmitUser,
    handleSubmitEdit,
    handleConfirm,
    handleDeleteUser,
    formData,
    setIsAddModalOpen,
    setIsEditModalOpen,
    setIsConfirmationModalOpen,
    errorFistName,
    errorLastName,
    errorEmail,
    errorPassword,
    confirmPassword
  };
};

export default useEditAddUser;
