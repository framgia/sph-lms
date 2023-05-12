import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Iframe from '@/src/shared/components/Iframe';
import NavbarDetail from '@/src/shared/components/NavbarDetail';
import SidebarContent from '@/src/shared/components/SidebarContent';
import ContentLayout from '@/src/shared/layouts/ContentLayout/ContentLayout';
import { Fragment } from 'react';

const CourseContent: React.FC = () => {
  const paths = [
    {
      text: 'Course',
      url: '/'
    },
    {
      text: 'Vue Introduction',
      url: '/trainer/courses/1/content'
    }
  ];

  return (
    <Fragment>
      <div className='ml-5 mt-5'>
        <Breadcrumbs paths={paths}/>
        <ContentLayout>
          <div className='text-[20px] font-semibold my-5 text-black2'>Vue Introduction</div>
          <div className='mb-5'>
            <NavbarDetail />
          </div>
          <div className="flex">
            <div>
              <SidebarContent />
            </div>
            <div className='ml-7 flex-grow '>
              <div className='text-[20px] font-semibold text-black2'>
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
          </div>
        </ContentLayout>
      </div>
    </Fragment>
  );
};

export default CourseContent;
