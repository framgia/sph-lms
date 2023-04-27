import React, { Fragment } from 'react';
import { ContentLayout } from '@/src/shared/layouts/ContentLayout/ContentLayout';
import Collapse from '@/src/shared/components/Collapse/Collapse';
import Button from '@/src/shared/components/Button';
import Navbar from '@/src/shared/components/Navbar';
import { dropdownItems, navItems } from '@/src/shared/utils/navBarList';
import EllipsesHorizontalIcon from '@/src/shared/icons/EllipsesHorizontalIcon';

interface CollapseData {
  id: number;
  label: string;
  hasIcon: boolean;
  content: Array<{
    id: number;
    title: string;
    details: {
      id: number;
      time_required: string;
      mandatory_item: string;
    };
  }>;
}
export const collapseData: CollapseData[] = [
  {
    id: 1,
    label: '101 Intro to Skyprep Basic',
    hasIcon: false,
    content: [
      {
        id: 11,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      },
      {
        id: 12,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      },
      {
        id: 13,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      },
      {
        id: 14,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      }
    ]
  },
  {
    id: 2,
    label: '101 Intro to Skyprep Basic',
    hasIcon: false,
    content: [
      {
        id: 21,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      },
      {
        id: 22,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      },
      {
        id: 23,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      },
      {
        id: 24,
        title: '101 Intro to Skyprep Basic',
        details: {
          id: 111,
          time_required: '03:49',
          mandatory_item: 'Mandatory-Item'
        }
      }
    ]
  }
];

const CourseContent: React.FC = () => {
  return (
    <Fragment>
      <Navbar navItems={navItems} dropdownItems={dropdownItems} />
      <ContentLayout>
        <div>
          <div className="flex flex-row">
            <div className="text-2xl pt-36 text-blue-500 ml-7">
              <h1>101 Intro To SkyPrep</h1>
            </div>
            <div className="flex items-center pl-4 cursor-pointer pt-36">
              <EllipsesHorizontalIcon
                height={35}
                width={35}
                classname="stroke-lightBlue"
              ></EllipsesHorizontalIcon>
            </div>
          </div>
          <div className="pt-10">
            <p className="text-base ml-7">
              Total Time Required: 29 min , 50 sec
            </p>
            <p className="text-sm text-gray-500 ml-7">
              The total time required for this module is the sum of the time
              required for each module
            </p>
          </div>
          <div className="flex-col gap-2">
            {collapseData.map((collapse, index) => (
              <>
                <Collapse
                  key={index}
                  classname="bg-lightGray"
                  label={collapse.label}
                  hasIcon={false}
                ></Collapse>
                {collapse.content.map((collapseContent, index) => (
                  <Collapse
                    key={index}
                    classname="bg-white font-bold"
                    label={collapse.label}
                    hasIcon={true}
                  >
                    <div className="ml-14 mt-5 pb-5 space-y-2">
                      <div className="text-color-lightBlue">
                        {' '}
                        Requirement & Settings for This Module
                      </div>
                      <p>{collapseContent.details.time_required.toString()}</p>
                      <p>{collapseContent.details.mandatory_item.toString()}</p>
                    </div>
                  </Collapse>
                ))}
              </>
            ))}
            ,
          </div>
        </div>
        <footer>
          <div className="flex flex-row justify-end items-center gap-2">
            <div className="pb-4 ">Cancel</div>
            <Button text={'Save Changes'}></Button>
          </div>
        </footer>
      </ContentLayout>
    </Fragment>
  );
};

export default CourseContent;
