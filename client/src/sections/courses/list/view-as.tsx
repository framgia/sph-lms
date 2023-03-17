import { Fragment } from 'react';
import type { FC } from 'react';
import GridCard from '@/src/shared/cards/GridCard';
import ListCard from '@/src/shared/cards/ListCard';
import { formatToLocaleDateString } from '@/src/shared/utils';

export interface TypeOfViewProps {
  typeOfView: string;
  listOfCourses: Array<{
    id: number;
    title: string;
    description: string;
    category_name: string;
    created_at: string;
  }>;
}

const ViewAs: FC<TypeOfViewProps> = ({
  typeOfView,
  listOfCourses
}: TypeOfViewProps) => {
  return (
    <Fragment>
      {typeOfView === 'grid'
        ? (<div className="grid grid-cols-3 ">
              {listOfCourses.map((data) => (
                <div
                  key={data.id}
                  className="m-3 drop-shadow-lg h-80 border-2 flex justify-between"
                >
                  <GridCard
                    courseTitle={data.title}
                    imageSource={'/image1.jpg'}
                    category={data.category_name}
                    date={formatToLocaleDateString(data.created_at)}
                  ></GridCard>
                </div>
              ))}
            </div>
          )
        : (<div>
              {listOfCourses.map((data, index) => (
                <div key={index} className="m-3">
                  <ListCard
                    courseTitle={data.title}
                    imageSource={'/image1.jpg'}
                    category={data.category_name}
                    date={formatToLocaleDateString(data.created_at)}
                  ></ListCard>
                </div>
              ))}
            </div>
          )
      }
    </Fragment>
  );
};

export default ViewAs;
