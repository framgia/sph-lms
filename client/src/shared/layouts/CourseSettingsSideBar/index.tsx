import React from 'react';
import Link from 'next/link';

const CourseSettingsSidebar: React.FunctionComponent = () => {
  return (
    <div className="mr-16 w-full">
      <div className="space-y-5">
        <div className="ml-36 inline">
          <h1 className="text-lg font-medium">Basic Course Settings</h1>
        </div>
        <div className="space-y-1 text-sm">
          <h3 className="underline">
            <Link href="#coursename">Course Name</Link>
          </h3>
          <h3 className="underline">
            <Link href="#courseintroduction">Course Introduction</Link>
          </h3>
          <h3 className="underline">
            <Link href="#courseimage">Course Image</Link>
          </h3>
          <h3 className="underline">
            <Link href="#shareablelink">Shareable Course Link</Link>
          </h3>
          <h3 className="underline">
            <Link href="#coursestatus">Course Status</Link>
          </h3>
        </div>
        <div className="ml-36 inline">
          <h1 className="text-lg font-medium">Advance Course Settings</h1>
        </div>
        <div className="space-y-1 text-sm">
          <h3 className="underline">
            <Link href="#coursecategory">Course Category</Link>
          </h3>
          <h3 className="underline">
            <Link href="#coursetags">Course Tags</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
export default CourseSettingsSidebar;
