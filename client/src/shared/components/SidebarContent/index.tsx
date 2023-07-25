/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, { Children, type FC, Fragment, type ReactElement, useEffect, useState } from 'react';
import { type ChildElementObject } from '../../utils/interface';
import { type SideBarProps } from './SideBar';

interface SidebarContentProps {
  children: ReactElement<SideBarProps> | Array<ReactElement<SideBarProps>>;
  isCheckbox?: boolean;
}

const SidebarContent: FC<SidebarContentProps> = ({ children, isCheckbox = false }) => {
  const [activeTab, setActiveTab] = useState<null | number>(null);
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});

  useEffect(() => {
    const childrenListObj: ChildElementObject = {};

    Children.map(children, (child, index) => {
      if (
        Object.hasOwnProperty.call(child.type, 'name') &&
        Object.getOwnPropertyDescriptors(child.type).name?.value === 'SideBar'
      ) {
        childrenListObj[index] = {
          id: index,
          title: child.props.title,
          childContent: child,
        };
      }
    });

    if (activeTab == null) {
      setActiveTab(Object.values(childrenListObj)[0]?.id);
    }

    setChildrenList(childrenListObj);
  }, [children, activeTab]);

  return (
    <Fragment>
      <div className="hidden md:flex">
        <div className="flex-col font-medium text-[14px] text-gray2 capitalize bg-gray1 w-[300px] h-screen">
          {Object.values(childrenList).map(({ title, id }) => (
            <div
              key={id}
              className={`${
                activeTab !== id ? 'p-2' : 'bg-lightRed border-red border-r-[2px] p-2 text-textGray'
              } cursor-pointer flex pointer-events-auto w-full pl-4`}
              onClick={() => {
                setActiveTab(id);
              }}
            >
              {isCheckbox && (
                <input
                  type="checkbox"
                  className="mr-2 accent-black cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              )}
              {title}
            </div>
          ))}
        </div>
      </div>

      <div>{activeTab !== null && childrenList[activeTab]?.childContent}</div>
    </Fragment>
  );
};
export default SidebarContent;
