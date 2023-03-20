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
        <div className="ml-36 inline">
          <h1 className="text-lg font-medium">Advance Course Settings</h1>
        </div>
        <div className="space-y-1 text-sm">
          <h3 className="underline">
            <Link href="/">Course Category</Link>
          </h3>
          <h3 className="underline">
            <Link href="/">Course Tags</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
export default CourseSettingsSidebar;
