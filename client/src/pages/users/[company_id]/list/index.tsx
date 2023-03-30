import Button from '@/src/shared/components/Button';
import InputField from '@/src/shared/components/InputField';
import Modal from '@/src/shared/components/Modal/Modal';
import EditIcon from '@/src/shared/icons/EditIcon';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import useEditAddUser from '@/src/shared/hooks/useEditAddUser';
import Select from '@/src/shared/components/Select';

const UsersList: React.FC = () => {
  const {
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
  } = useEditAddUser();

  return (
    <div>
      <div>
        <div className='ml-12 mb-12'>
          <Button text='Add User' hover='hover:bg-blue-700' width='20' onClick={handleOpenAddModal} />
          <div onClick={handleOpenEditModal} className='cursor-pointer'>
            <EditIcon classname='text-blue-700 w-7 h-7 font-extrabold text-xl' />
          </div>
        </div>
        <div>
        </div>
        <Modal isOpen={isAddModalOpen}>
          <div className='flex justify-between relative mx-6' >
            <div>
              <h1 className='text-3xl mt-6 mb-14'>Add a new User</h1>
            </div>
            <div className='mt-8 cursor-pointer' onClick={() => { setIsAddModalOpen(false); }}>
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
                  {(errorFistName.length > 0) && <span className='text-red-500'>{errorFistName}</span>}
                </div>
              </div>
              <div>
                <label className='ml-6 text-sm font-bold'>Last Name</label>
                <div className='mx-6'>
                  <InputField value={formData.lastName} eventHandler={handleChange} name="lastName" />
                  {(errorLastName.length > 0) && <span className='text-red-500'>{errorLastName}</span>}
                </div>
              </div>
              <div>
                <label className='ml-6 text-sm font-bold'>Email</label>
                <div className='mx-6'>
                  <InputField value={formData.email} eventHandler={handleChange} name="email" />
                  {(errorEmail.length > 0) && <span className='text-red-500'>{errorEmail}</span>}
                </div>
              </div>
            </div>
            <div className='flex justify-end mr-6'>
              <Button text='Create New User' type='submit' />
            </div>
          </form>
        </Modal>
        <Modal isOpen={isEditModalOpen}>
          <div className='flex justify-between relative mx-6 sticky'>
            <div>
              <h1 className='text-3xl mt-6 mb-14'>John Strong</h1>
            </div>
            <div className='mt-8 cursor-pointer' onClick={() => { setIsEditModalOpen(false); }}>
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
                  {(errorEmail.length > 0) && <span className='text-red-500'>{errorEmail}</span>}
                </div>
              </div>
              <div>
                <label className='ml-6 text-sm font-bold'>First Name</label>
                <div className='mx-6'>
                  <InputField value={formData.firstName} eventHandler={handleChange} name="firstName" />
                  {(errorFistName.length > 0) && <span className='text-red-500'>{errorFistName}</span>}
                </div>
              </div>
              <div>
                <label className='ml-6 text-sm font-bold'>Last Name</label>
                <div className='mx-6'>
                  <InputField value={formData.lastName} eventHandler={handleChange} name="lastName" />
                  {(errorLastName.length > 0) && <span className='text-red-500'>{errorLastName}</span>}
                </div>
              </div>
              <div>
                <label className='ml-6 text-sm font-bold'>Password</label>
                <div className='mx-6'>
                  <InputField value={formData.password} eventHandler={handleChange} name="password" type='password' />
                  {(errorPassword.length > 0) && <span className='text-red-500'>{errorPassword}</span>}
                </div>
              </div>
              <div>
                <label className='ml-6 text-sm font-bold'>Confirm Password</label>
                <div className='mx-6'>
                  <InputField value={formData.confirmPassword} eventHandler={handleChange} name="confirmPassword" type='password' />
                  {(confirmPassword.length > 0) && <span className='text-red-500'>{confirmPassword}</span>}
                </div>
              </div>
            </div>
            <div className='flex justify-between mx-6'>
              <Button text='Delete User' color='red' hover='hover:bg-red-600' onClick={handleDeleteUser} />
              <Button text='Update User' hover='hover:bg-blue-700' type='submit' />
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
          <div className='text-lg px-6 pb-10'>{confirmationMessage}</div>
          <div className='flex justify-between mx-6'>
            <Button text='Cancel' color='red' hover='hover:bg-red-600' onClick={() => { setIsConfirmationModalOpen(false); }} />
            <Button text='Confirm' hover='hover:bg-blue-700' onClick={handleConfirm} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UsersList;
