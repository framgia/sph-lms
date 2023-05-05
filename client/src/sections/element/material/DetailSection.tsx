import Tabs from '@/src/shared/components/Tabs';
import Tab from '@/src/shared/components/Tabs/Tab';
import React, { type FC, Fragment } from 'react';
import PreviewSection from './PreviewSection';
import EditSection from './EditSection';
import { ListItemI } from '@/src/pages/element/material';
export interface DetailSectionProps {
  data: ListItemI;
}

const DetailSection: FC<DetailSectionProps> = ({ data }) => {
  return (
    <Fragment>
      <h3 className="text-[1.6rem] text-lightBlue">{data.name}</h3>
      <Tabs>
        <Tab title="Preview">
          <PreviewSection type={data.type} link={data.link ?? '#'} />
        </Tab>
        <Tab title="Edit Detail">
          <EditSection data={data} />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default DetailSection;
