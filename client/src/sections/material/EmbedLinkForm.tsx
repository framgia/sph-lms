import React, { Fragment } from 'react';

export interface IsActiveProps {
  isActive: boolean;
}

const EmbedLinkForm: React.FunctionComponent<IsActiveProps> = ({
  isActive
}: IsActiveProps) => {
  return (
    <Fragment>
      <div className={`m-2 ${isActive ? 'block' : 'hidden'}`}>
        EMBED LINK FORM HERE
      </div>
    </Fragment>
  );
};

export default EmbedLinkForm;
