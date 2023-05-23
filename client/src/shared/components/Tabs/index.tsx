/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, { Children, type FC, Fragment, type ReactElement, useEffect, useState } from 'react';
import { type ChildElementObject } from '../../utils/interface';
import { type TabProps } from './Tab';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setActiveTab } from '@/features/tab/tabSlice';

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const { activeTab } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});

  useEffect(() => {
    let tab = 0;
    const childrenListObj: ChildElementObject = {};

    Children.map(children, (child) => {
      if (
        Object.hasOwnProperty.call(child.type, 'name') &&
        Object.getOwnPropertyDescriptors(child.type).name?.value === 'Tab'
      ) {
        childrenListObj[tab] = {
          id: tab,
          title: child.props.title,
          childContent: child,
        };
        tab++;
      }
    });

    setChildrenList(childrenListObj);
  }, [children, activeTab]);

  return (
    <Fragment>
      <div className="hidden md:flex mb-4 border-b">
        <div className="flex space-x-[12px] font-medium text-[14px] text-textGray capitalize items-center">
          {Object.values(childrenList).map(({ title, id }) => (
            <div
              key={id}
              className={`${
                activeTab !== id ? 'p-2' : ' bg-lightRed border-red p-2 border-b-[2px]'
              } cursor-pointer flex pointer-events-auto`}
              onClick={() => {
                dispatch(setActiveTab(id));
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>

      <div>{childrenList[activeTab]?.childContent}</div>
    </Fragment>
  );
};
export default Tabs;
