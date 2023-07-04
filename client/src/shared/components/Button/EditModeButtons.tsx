import { type FC, Fragment } from 'react';
import Button from '.';

interface EditModeButtonsProps {
  editMode: boolean;
  onCancel: () => void;
  onSave: () => void;
  onEdit: () => void;
}

const EditModeButtons: FC<EditModeButtonsProps> = ({ editMode, onCancel, onSave, onEdit }) => {
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
            buttonClass="border border-red text-red !font-medium text-[14px] px-[18px] py-[6.5px] font-inter"
          />
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
