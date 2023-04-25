import React, { Fragment } from 'react';

export interface IsActiveProps {
  isActive: boolean;
}

const YouTubeForm: React.FunctionComponent<IsActiveProps> = ({
  isActive
}: IsActiveProps) => {
  return (
    <Fragment>
      <div className={`m-2 ${isActive ? 'block' : 'hidden'}`}>
        Youtube FORM HERE
      </div>
    </Fragment>
  );
};

export default YouTubeForm;
