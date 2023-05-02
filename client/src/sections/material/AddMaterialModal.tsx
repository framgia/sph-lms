import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import TabButton from '@/src/shared/components/TabButton';
import React, { Fragment, useState } from 'react';
import MaterialForm from './MaterialForm';

const AddMaterialModal: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddMaterialModal = (): void => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const [activeTab, setActiveTab] = useState('singleFile');

  const tabButtons = [
    {
      text: 'Single File',
      isActive: activeTab === 'singleFile',
      onClick: () => handleTabClick('singleFile')
    },
    {
      text: 'YouTube',
      isActive: activeTab === 'youTube',
      onClick: () => handleTabClick('youTube')
    },
    {
      text: 'Embed Link',
      isActive: activeTab === 'embedLink',
      onClick: () => handleTabClick('embedLink')
    }
  ];

  const handleTabClick = (tab: string): string => {
    setActiveTab(tab);
    return tab;
  };

  return (
    <Fragment>
      <Button text="Add Material" onClick={handleAddMaterialModal} />

      <Modal
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:my-8 lg:align-middle w-2/3"
        isOpen={isAddModalOpen}
      >
        <div className="flex justify-between m-4">
          <h1 className="text-2xl ">Add Material</h1>
          <Button
            text="X"
            onClick={handleAddMaterialModal}
            color="bg-inherit"
            textColor="text-black"
          />
        </div>

        <div className="flex justify-between m-4">
          <div className="border float-left w-1/3">
            {tabButtons.map((item, index) => (
              <TabButton
                key={index}
                text={item.text}
                isActive={item.isActive}
                onClick={item.onClick}
              />
            ))}
          </div>
          <div className="border float-right w-3/4 overflow-hidden">
            <MaterialForm activeField={activeTab} />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddMaterialModal;
