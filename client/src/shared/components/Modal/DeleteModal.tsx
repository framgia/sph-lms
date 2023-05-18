import { type FC } from 'react';
import Modal from '@/src/shared/components/Modal/Modal';
import XmarkIcon from '../../icons/XmarkIcon';
import Button from '../Button';

interface DeleteModalProps {
  state: boolean;
  type: string;
  title: string;
  closeModal: () => void;
  onDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  state,
  type = '',
  title = '',
  closeModal,
  onDelete,
}) => {
  return (
    <Modal className="p-4 !w-[30%]" isOpen={state}>
      <div className="flex items-center justify-between pb-4 mb-4">
        <h2 className="text-[16px] font-bold">Delete confirmation</h2>
        <XmarkIcon
          className="cursor-pointer"
          onClick={() => {
            closeModal();
          }}
        />
      </div>
      <p>
        You are about to delete a {type}. Are you sure you want to delete{' '}
        <span className="text-red">{title}</span>?
      </p>
      <div className="flex mt-[48px] justify-center space-x-2 text-[14px]">
        <Button
          onClick={() => {
            closeModal();
          }}
          buttonClass="border border-textGray py-[6px] !px-4"
          text="Cancel"
        />
        <Button
          onClick={() => {
            onDelete();
          }}
          type="submit"
          buttonClass="border border-red !text-red py-[6px] !w-36"
          text="Delete"
        />
      </div>
    </Modal>
  );
};

export default DeleteModal;
