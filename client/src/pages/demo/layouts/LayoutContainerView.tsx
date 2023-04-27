import React, { Fragment } from 'react';
import { ContentLayout } from '@/src/shared/layouts/ContentLayout/ContentLayout';

const SidebarLayout: React.FunctionComponent = () => {
  return (
    <Fragment>
      <ContentLayout>
      <div className="flex justify-center items-center h-screen bg-red-50">
          Right Side Bar Layout
        </div>
      </ContentLayout>
    </Fragment>
  );
};

export default SidebarLayout;
