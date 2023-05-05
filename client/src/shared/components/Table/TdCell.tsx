/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { type FC } from 'react';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';
import Icon, { type IconData } from './Icon';

interface TdCellProps {
  column: string;
  data: any;
  headerEnum: { [key: string]: string };
  columnWithIcons?: string[];
  editable?: boolean;
  deletable?: boolean;
  clickableColumns?: { [key: string]: (data: any) => void };
}

const TdCell: FC<TdCellProps> = ({
  column,
  data,
  clickableColumns = {},
  columnWithIcons = [],
  editable,
  deletable,
  headerEnum
}) => {
  const item = data[column as keyof typeof data];
  const isClickable = Object.hasOwnProperty.call(clickableColumns, column);

  const instanceOfA = (object: any): object is IconData => {
    return 'type' in object;
  };
  const handleClick = (): void => {
    if (isClickable) {
      clickableColumns[column](data);
    }
  };

  const showIcon = columnWithIcons.includes(column) && instanceOfA(data);
  return (
    <td
      onClick={handleClick}
      className={`px-6 py-4 ${isClickable && 'cursor-pointer'}`}
    >
      <div className="flex items-center space-x-2">
        {showIcon && <Icon item={data} className="h-6 w-6 text-lightBlue" />}
        {column === headerEnum.Actions && (
          <div className="flex invisible items-center group-hover:visible">
            {editable && <EditIcon className="w-5 h-5 mx-1 cursor-pointer" />}
            {deletable && (
              <TrashIcon className="w-5 h-5 mx-1 text-red-600 cursor-pointer" />
            )}
          </div>
        )}
        <p>
          {item instanceof Date ? item.toLocaleDateString() : (item as string)}
        </p>
      </div>
    </td>
  );
};

export default TdCell;
