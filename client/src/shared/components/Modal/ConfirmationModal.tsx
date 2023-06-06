import { type FC } from 'react';
import Modal from '@/src/shared/components/Modal/Modal';
import XmarkIcon from '../../icons/XmarkIcon';
import Button from '../Button';

interface ConfirmationModalProps {
  state: boolean;
  item: string;
  action?: string;
  itemTitle: string;
  confirmTitle?: string;
  closeModal: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  state,
  item = '',
  itemTitle = '',
  action = 'delete',
  confirmTitle = 'Delete',
  closeModal,
  onConfirm,
}) => {
  return (
    <Modal className="p-4 !w-[30%]" isOpen={state}>
      <div className="flex items-center justify-between pb-4 mb-4">
        <h2 className="text-[16px] font-medium">
          <span className="capitalize">{action}</span> confirmation
        </h2>
        <XmarkIcon
          className="cursor-pointer"
          onClick={() => {
            closeModal();
          }}
        />
      </div>
      <p className="font-normal">
        You are about to {action} a {item}. Are you sure you want to {action}{' '}
        <span className="text-red">{itemTitle}</span>?
      </p>
      <div className="flex mt-[48px] justify-center space-x-2 text-[14px]">
        <Button
          onClick={() => {
            closeModal();
          }}
          buttonClass="border border-textGray py-[6px] !px-4 !font-medium"
          text="Cancel"
        />
        <Button
          onClick={() => {
            onConfirm();
          }}
          type="submit"
          buttonClass="border border-red !text-red py-[6px] !w-36 !font-medium"
          text={confirmTitle}
        />
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
