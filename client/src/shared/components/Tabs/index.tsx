/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { Fragment, useEffect, useState, type FC, type ReactElement } from 'react';
import { type ChildElementObject } from '../../utils/interface';
import { type TabProps } from './Tab';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { reset, setActiveTab } from '@/src/features/tab/tabSlice';
import { useRouter } from 'next/router';

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const { activeTab } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});
  const { events } = useRouter();

  useEffect(() => {
    let tab = 0;
    const childrenListObj: ChildElementObject = {};
    const childrenArr = children instanceof Array ? children : Array(children);

    childrenArr.map((child) => {
      childrenListObj[tab] = {
        id: tab,
        title: child.props.title,
        childContent: child,
      };
      tab++;
    });

    setChildrenList(childrenListObj);
  }, [children, activeTab]);

  useEffect(() => {
    events.on('routeChangeComplete', () => {
      dispatch(reset());
    });
  }, []);

  return (
    <Fragment>
      <div className="hidden md:flex mb-4 border-b border-gray-400">
        <div className="flex font-medium text-sm text-dark capitalize items-center">
          {Object.values(childrenList).map(({ title, id }) => (
            <div
              key={id}
              className={`${
                activeTab !== id ? '' : ' bg-primary-400 border-primary-base border-b-[2px]'
              } p-2.5 cursor-pointer flex pointer-events-auto`}
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
