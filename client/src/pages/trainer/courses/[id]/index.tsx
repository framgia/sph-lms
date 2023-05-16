import ContentSection from '@/src/sections/courses/ContentSection';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import Container from '@/src/shared/layouts/Container';
import { Fragment } from 'react';

const CourseContent: React.FC = () => {
  const paths = [
    {
      text: 'Course',
      url: '/'
    },
    {
      text: 'Vue Introduction',
      url: '/trainer/courses/1'
    }
  ];

  return (
    <Fragment>
      <div className='ml-5 mt-5'>
        <Breadcrumbs paths={paths}/>
        <Container padding='px-28'>
          <div className='text-[20px] font-semibold my-5 text-textGray'>Vue Introduction</div>
          <Tabs>
            <Tab title='Content' >
                <ContentSection />
            </Tab>
            <Tab title='Learning' >
                <div>Insert Learning here</div>
            </Tab>
            <Tab title='Settings' >
                <div>Insert Setting here</div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseContent;
