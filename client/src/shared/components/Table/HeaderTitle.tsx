/* eslint-disable multiline-ternary */
import { type FC, Fragment } from 'react';
import { type TableHeader, TableSortEnum } from '.';
import ChevronDown from '../../icons/ChevronDownIcon';

interface HeaderTitleProps {
  item: TableHeader;
  index: number;
  sort: { index: number; sortBy: TableSortEnum };
  sortable?: boolean;
  handleSortChange: (uid: number) => void;
}

const HeaderTitle: FC<HeaderTitleProps> = ({
  item,
  index,
  sort,
  sortable = true,
  handleSortChange,
}) => {
  const arrowClasses =
    sort.index === index && sort.sortBy === TableSortEnum.DESC
      ? 'order-last'
      : 'rotate-180 order-last';

  return (
    <Fragment>
      {item.onClick !== null ? (
        <button
          type="button"
          className="flex space-x-2"
          onClick={() => {
            if (!sortable) return;
            if (item?.onClick !== null && item?.onClick !== undefined) {
              item.onClick();
              handleSortChange(index);
            }
          }}
        >
          <p className="text-sm font-medium">{item.text}</p>

          {sortable && (
            <ChevronDown
              height={4}
              width={4}
              className={`w-5 h-5 ${arrowClasses} ${
                sort.index === index ? 'text-sky-900' : 'text-gray-400'
              } `}
            />
          )}
        </button>
      ) : (
        <span>{item.text}</span>
      )}
    </Fragment>
  );
};

export default HeaderTitle;
