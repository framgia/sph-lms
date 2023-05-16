import Iframe from '@/src/shared/components/Iframe';
import SidebarContent from '@/src/shared/components/SidebarContent';
import SideBar from '@/src/shared/components/SidebarContent/SideBar';
import React, { Fragment } from 'react';

const ContentSection: React.FC = () => {
  return (
    <Fragment>
  <div className="flex">
    <SidebarContent>
        <SideBar title='Section 1'>
            <div className='ml-7 flex-grow '>
              <div className='text-[20px] font-semibold text-textGray'>
                Section 1
              </div>
              <div className='py-3'>
                <Iframe
                  src="https://www.youtube.com/embed/cJveiktaOSQ"
                  className="border w-full"
                />
              </div>
              <div className='text-[14px] font-semibold py-2'>
                Description:
              </div>
              <div className='text-[14px] pb-24'>
                Lorem ipsum dolor sit amet consectetur. Lectus sed interdum euismod rhoncus quis eu elementum. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.  Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.
              </div>
            </div>
        </SideBar>
        <SideBar title='Section 2'>
        <div className='ml-7 flex-grow '>
              <div className='text-[20px] font-semibold text-textGray'>
                Section 2
              </div>
              <div className='py-3'>
                <Iframe
                  src="https://www.youtube.com/embed/HGl75kurxok"
                  className="border w-full"
                />
              </div>
              <div className='text-[14px] font-semibold py-2'>
                Description:
              </div>
              <div className='text-[14px] pb-24'>
                Lorem ipsum dolor sit amet consectetur. Lectus sed interdum euismod rhoncus quis eu elementum. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.  Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.
              </div>
            </div>
        </SideBar>
        <SideBar title='Section 3'>
        <div className='ml-7 flex-grow '>
              <div className='text-[20px] font-semibold text-textGray'>
                Section 3
              </div>
              <div className='py-3'>
                <Iframe
                  src="https://www.youtube.com/embed/Zy0y_gnyeJY"
                  className="border w-full"
                />
              </div>
              <div className='text-[14px] font-semibold py-2'>
                Description:
              </div>
              <div className='text-[14px] pb-24'>
                Lorem ipsum dolor sit amet consectetur. Lectus sed interdum euismod rhoncus quis eu elementum. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.  Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.
              </div>
            </div>
        </SideBar>
        <SideBar title='Section 4'>
        <div className='ml-7 flex-grow '>
              <div className='text-[20px] font-semibold text-textGray'>
                Section 4
              </div>
              <div className='py-3'>
                <Iframe
                  src="https://www.youtube.com/embed/d56mG7DezGs"
                  className="border w-full"
                />
              </div>
              <div className='text-[14px] font-semibold py-2'>
                Description:
              </div>
              <div className='text-[14px] pb-24'>
                Lorem ipsum dolor sit amet consectetur. Lectus sed interdum euismod rhoncus quis eu elementum. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.  Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas. Sapien eu faucibus nisl tristique ultricies morbi pellentesque volutpat egestas.
              </div>
            </div>
        </SideBar>
    </SidebarContent>
    </div>
</Fragment>
  );
};

export default ContentSection;
