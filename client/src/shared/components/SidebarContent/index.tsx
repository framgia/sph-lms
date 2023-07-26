/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, { Children, type FC, Fragment, type ReactElement, useEffect, useState } from 'react';
import { type ChildElementObject } from '../../utils/interface';
import { type SideBarProps } from './SideBar';
import {
  useAddCompletedLessonMutation,
  useRemoveCompletedLessonMutation,
} from '@/src/services/traineeAPI';
import { alertError, alertSuccess } from '../../utils';

interface SidebarContentProps {
  children: ReactElement<SideBarProps> | Array<ReactElement<SideBarProps>>;
  isCheckbox?: boolean;
}

const SidebarContent: FC<SidebarContentProps> = ({ children, isCheckbox = false }) => {
  const [activeTab, setActiveTab] = useState<null | number>(null);
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});
  const [addCompletedLesson] = useAddCompletedLessonMutation();
  const [removeCompletedLesson] = useRemoveCompletedLessonMutation();

  useEffect(() => {
    const childrenListObj: ChildElementObject = {};

    Children.map(children, (child, index) => {
      if (
        Object.hasOwnProperty.call(child.type, 'name') &&
        Object.getOwnPropertyDescriptors(child.type).name?.value === 'SideBar'
      ) {
        childrenListObj[index] = {
          id: index,
          lesson_id: child.key,
          title: child.props.title,
          isCompleted: child.props.is_completed,
          childContent: child,
        };
      }
    });

    if (activeTab == null) {
      setActiveTab(Object.values(childrenListObj)[0]?.id);
    }

    setChildrenList(childrenListObj);
  }, [children, activeTab]);

  const handleCheckbox = async (lesson: number, isCompleted: boolean): Promise<void> => {
    if (isCompleted) {
      try {
        const res: any = await removeCompletedLesson(lesson);

        if ('error' in res) {
          const { data } = res.error;
          const property = Object.keys(data)[0];
          const errorMessage = data[property];
          throw new Error(errorMessage);
        } else {
          alertSuccess(res.data.message);
        }
      } catch (e: any) {
        alertError(e.message);
      }
    } else {
      try {
        const formData = { lesson };
        const res: any = await addCompletedLesson(formData);

        if ('error' in res) {
          const { data } = res.error;
          const property = Object.keys(data)[0];
          const errorMessage = data[property];
          throw new Error(errorMessage);
        } else {
          alertSuccess(res.data.message);
        }
      } catch (e: any) {
        alertError(e.message);
      }
    }
  };

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
                  defaultChecked={childrenList[id].isCompleted}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckbox(
                      childrenList[id].lesson_id as number,
                      childrenList[id].isCompleted as boolean
                    );
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
