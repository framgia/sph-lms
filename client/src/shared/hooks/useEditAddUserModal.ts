/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';

const useEditAddModal = (): any => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddModal = (): void => {
    setIsAddModalOpen(true);
  };

  return {
    isAddModalOpen,
    handleOpenAddModal,
    setIsAddModalOpen
  };
};

export default useEditAddModal;
