import React from 'react';
import Link from 'next/link';

const CourseSettingsSidebar: React.FunctionComponent = () => {
  return (
    <div>
      <div className="space-y-9">
        <div>
          <div>
            <h1 className="text-lg pb-2 font-medium">Basic Course Settings</h1>
          </div>
          <div className="space-y-1 ml-5 text-sm">
            <h3 className="underline">
              <Link href="/">Course Name</Link>
            </h3>
            <h3 className="underline">
              <Link href="/">Course Introduction</Link>
            </h3>
            <h3 className="underline">
              <Link href="/">Course Image</Link>
            </h3>
            <h3 className="underline">
              <Link href="/">Shareable Course Link</Link>
            </h3>
            <h3 className="underline">
              <Link href="/">Course Status</Link>
            </h3>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-lg pb-2 font-medium">
              Advance Course Settings
            </h1>
          </div>
          <div className="space-y-1 ml-5 text-sm">
            <h3 className="underline">
              <Link href="/">Course Category</Link>
            </h3>
            <h3 className="underline">
              <Link href="/">Course Tags</Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseSettingsSidebar;
