import React, { Fragment } from 'react';

export interface SingleFileFormProps {
  isActive: boolean;
}

const SingleFileForm: React.FunctionComponent<SingleFileFormProps> = ({
  isActive
}: SingleFileFormProps) => {
  return (
    <Fragment>
      <div className={`m-2 ${isActive ? 'block' : 'hidden'}`}>
        SINGEL FILE FORM HERE
      </div>
    </Fragment>
  );
};

export default SingleFileForm;
