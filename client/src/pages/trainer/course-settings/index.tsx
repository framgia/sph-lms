import React, { Fragment } from 'react';

import InputField from '@/src/shared/components/InputField';
import RichInputTextField from '@/src/shared/components/RichInputTextField';
import ShareableLink from '@/src/shared/components/ShareableLink';
import RadioButton from '@/src/shared/components/RadioButton';
import Select from '@/src/shared/components/Select';
import Button from '@/src/shared/components/Button';
import CourseSettingsSidebar from '@/src/shared/layouts/CourseSettingsSideBar';

const CourseSetting: React.FC = () => {
  return (
    <Fragment>
      <div className="pr-48">
        <div className="font-medium text-xl">
          <h1 className="pb-7">Basic Course Settings</h1>
          <div className="pb-5" id="coursename">
            <InputField
              placeholder={'101 Intro to SkyPrep'}
              type="text"
              width="40%"
              label="Course Name"
              id="course-name"
              name="title"
            />
          </div>
          <div className="pb-10" id="courseintroduction">
            <RichInputTextField label="Course Introduction" />
          </div>
          <div className="pb-10" id="courseimage">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Image
            </label>
            <p className="w-2/4 text-slate-400 text-sm pb-3">
              Image size: 440 x 296px, 3 mb maximum. File type: png, jpeg,
              jpeg2000
            </p>
            <div className="bg-sky-600 p-4 rounded-sm shadow-md h-64 w-64 text-white">
              Image Container
            </div>
          </div>

          <div className="pb-10" id="shareablelink">
            <ShareableLink
              url="https:sample-url-that-leads-to-nowhere.com"
              label="Shareable Course Link"
              width="36%"
            />
          </div>
          <div className="pb-10" id="coursestatus">
            <RadioButton
              label="Course Status"
              description="If a course is active learners can access it. If inactive, it will not be visible to learners. It is recommended to make a course inactive before making any changes to it if learners have been enrolled."
              options={['Active Course', 'Inactive Course']}
              classname="block text-gray-700 text-sm font-bold mb-2"
            />
          </div>
          <h1 className="pb-7">Advance Course Settings</h1>
          <div className="pb-5" id="coursecategory">
            <Select
              width="40%"
              label="Course Category"
              options={[
                { id: 1, text: 'Category 1' },
                { id: 2, text: 'Category 2' },
                { id: 3, text: 'Category 3' }
              ]}
              name="course_category"
            />
            <a className="underline text-sm text-sky-600" href="#">
              Create New Category
            </a>
          </div>
          <div className="pt-5 pb-10" id="coursetags">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Tags
            </label>
            <Button text="Manage Tags" color="#0284BE" width="200px" />
          </div>
        </div>
      </div>

      <div>
        <CourseSettingsSidebar />
      </div>
    </Fragment>
  );
};

export default CourseSetting;
