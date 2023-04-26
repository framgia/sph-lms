import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import TabButton from '@/src/shared/components/TabButton';
import React, { Fragment, useState } from 'react';
import SingleFileForm from './SingleFileForm';
import YouTubeForm from './YoutubeForm';
import EmbedLinkForm from './EmbedLinkForm';

const AddMaterialModal: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddMaterialModal = (): void => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const [activeTab, setActiveTab] = useState('singleFile');

  const handleTabClick = (tab: string): string => {
    setActiveTab(tab);
    return tab;
  };

  return (
    <Fragment>
      <Button text="Add Material" onClick={handleAddMaterialModal} />

      <Modal className="w-2/3" isOpen={isAddModalOpen}>
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
            <TabButton
              text="Single File"
              isActive={activeTab === 'singleFile'}
              onClick={() => handleTabClick('singleFile')}
            />
            <TabButton
              text="YouTube"
              isActive={activeTab === 'youTube'}
              onClick={() => handleTabClick('youTube')}
            />
            <TabButton
              text="Embed Link"
              isActive={activeTab === 'embedLink'}
              onClick={() => handleTabClick('embedLink')}
            />
          </div>
          <div className="border float-right w-3/4 overflow-hidden">
            <SingleFileForm isActive={activeTab === 'singleFile'} />
            <YouTubeForm isActive={activeTab === 'youTube'} />
            <EmbedLinkForm isActive={activeTab === 'embedLink'} />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddMaterialModal;
