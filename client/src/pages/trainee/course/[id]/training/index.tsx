/* eslint-disable multiline-ternary */
import React, { Fragment } from 'react';
import Container from '@/src/shared/layouts/Container';
import Breadcrumbs from '@/src/shared/components/Breadcrumbs';
import SidebarContent from '@/src/shared/components/SidebarContent';
import SideBar from '@/src/shared/components/SidebarContent/SideBar';
import Iframe from '@/src/shared/components/Iframe';

const TrainingPage: React.FunctionComponent = () => {
  const paths = [
    {
      text: 'My Course',
      url: '/trainer/courses',
    },
    {
      text: 'Course Title',
      url: '/trainee/course/1/training',
    },
  ];
  return (
    <Fragment>
      <Container>
        <div className="ml-5 mt-5">
          <Breadcrumbs paths={paths} />
          <div className="flex flex-grow h-full mt-5">
            <SidebarContent isCheckbox={true}>
              <SideBar title="Section 1">
                <div className="ml-7">
                  <div className="text-[20px] font-semibold text-textGray">Section 1</div>
                  <div className="py-3">
                    <Iframe
                      src="https://www.youtube.com/embed/cJveiktaOSQ"
                      className="w-[946px] h-[554px]"
                    />
                  </div>
                </div>
              </SideBar>
              <SideBar title="Section 2">
                <div className="ml-7 flex-grow ">
                  <div className="text-[20px] font-semibold text-textGray">Section 2</div>
                  <div className="py-3">
                    <Iframe
                      src="https://www.youtube.com/embed/HGl75kurxok"
                      className="w-[946px] h-[554px]"
                    />
                  </div>
                </div>
              </SideBar>
              <SideBar title="Section 3">
                <div className="ml-7 flex-grow ">
                  <div className="text-[20px] font-semibold text-textGray">Section 3</div>
                  <div className="py-3">
                    <Iframe
                      src="https://www.youtube.com/embed/Zy0y_gnyeJY"
                      className="w-[946px] h-[554px]"
                    />
                  </div>
                </div>
              </SideBar>
              <SideBar title="Section 4">
                <div className="ml-7 flex-grow ">
                  <div className="text-[20px] font-semibold text-textGray">Section 4</div>
                  <div className="py-3">
                    <Iframe
                      src="https://www.youtube.com/embed/d56mG7DezGs"
                      className="w-[946px] h-[554px]"
                    />
                  </div>
                </div>
              </SideBar>
            </SidebarContent>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default TrainingPage;
