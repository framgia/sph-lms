import { type FC, Fragment } from 'react';
import AddMaterialModal from '@/src/sections/material/AddMaterialModal';
import AddFolderModal from '@/src/sections/material/AddFolderModal';

const Material: FC = () => {
  return (
    <Fragment>
      <div className="flex justify-end">
        <AddFolderModal />
        <AddMaterialModal />
      </div>
    </Fragment>
  );
};

export default Material;
