import React, { Fragment } from 'react';

import { ContentLayout } from '@/src/shared/layouts/ContentLayout/ContentLayout';
import Collapse from '@/src/shared/components/Collapse/Collapse';

const CourseContent: React.FC = () => {
  return (
    <Fragment>
      <div>
        <ContentLayout>
          <div className="text-2xl pt-40 text-blue-500">
            <h1>101 Intro To SkyPrep</h1>
          </div>
          <div className="pt-36">
            <p className="text-base">Total Time Required: 29 min , 50 sec</p>
            <p className="text-sm">
              The total time required for this module is the sum of the time
              required for each module
            </p>
          </div>
          <div className="pt-5 space-y-3">
            <Collapse
              color="bg-slate-400"
              label="101 Intro to Skyprep Basic"
              bold="font-bold"
              hasIcon={false}
            ></Collapse>
            <Collapse></Collapse>
            <Collapse></Collapse>
            <Collapse></Collapse>
            <Collapse></Collapse>
          </div>
        </ContentLayout>
      </div>
    </Fragment>
  );
};

export default CourseContent;
