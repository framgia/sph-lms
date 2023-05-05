/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import React, {
  Children,
  type FC,
  Fragment,
  type ReactElement,
  useEffect,
  useState
} from 'react';
import { type TabProps } from './Tab';
import EllipsesHorizontalIcon from '../../icons/EllipsesHorizontalIcon';

interface ChildElement {
  id: number;
  title: string;
  childContent: ReactElement;
}

interface ChildElementObject {
  [key: number]: ChildElement;
}

interface TabsProps {
  children: ReactElement<TabProps> | Array<ReactElement<TabProps>>;
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<null | number>(null);
  const [childrenList, setChildrenList] = useState<ChildElementObject>({});

  useEffect(() => {
    const childrenListObj: ChildElementObject = {};

    Children.map(children, (child, index) => {
      if (
        Object.hasOwnProperty.call(child.type, 'name') &&
        Object.getOwnPropertyDescriptors(child.type).name?.value === 'Tab'
      ) {
        childrenListObj[index] = {
          id: index,
          title: child.props.title,
          childContent: child
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
      <div className="border-b-2 my-6">
        <div className="flex space-x-10 p-2 text-sm text-gray-600 capitalize items-center">
          {Object.values(childrenList).map(({ title, id }) => (
            <div
              key={id}
              className={`${
                activeTab !== id
                  ? ''
                  : 'md:underline font-semibold text-lightBlue'
              } ' cursor-pointer hover:underline underline-offset-1'`}
              onClick={() => {
                setActiveTab(id);
              }}
            >
              {title}
            </div>
          ))}
          <EllipsesHorizontalIcon
            height={30}
            width={30}
            classname="stroke-lightBlue cursor-pointer"
          />
        </div>
      </div>

      <div>{activeTab !== null && childrenList[activeTab]?.childContent}</div>
    </Fragment>
  );
};
export default Tabs;
