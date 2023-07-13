import { type FC, Fragment } from 'react';
import Button from '.';
import { useAppSelector } from '@/src/redux/hooks';
import LoadingSpinner from '../LoadingSpinner';

interface EditModeButtonsProps {
  editMode: boolean;
  onCancel: () => void;
  onSave: () => void;
  onEdit: () => void;
}

const EditModeButtons: FC<EditModeButtonsProps> = ({ editMode, onCancel, onSave, onEdit }) => {
  const { isLoading } = useAppSelector((state) => state.stepper);
  return (
    <Fragment>
      {editMode ? (
        <div className="flex space-x-1">
          <Button
            onClick={onCancel}
            text="Cancel"
            buttonClass="border border-textGray !font-medium text-[14px] py-[6px] !px-4 "
          />
          <Button
            onClick={onSave}
            text="Save changes"
            buttonClass={`${
              isLoading && 'opacity-50 pointer-events-none'
            } border border-red text-red !font-medium text-[14px] px-[18px] py-[6.5px] font-inter`}
          >
            {isLoading ? <LoadingSpinner /> : <></>}
          </Button>
        </div>
      ) : (
        <Button
          onClick={onEdit}
          text="Edit settings"
          buttonClass="border border-red text-red text-sm h-9 items-center rounded-md font-medium px-4 py-2"
        />
      )}
    </Fragment>
  );
};

export default EditModeButtons;
