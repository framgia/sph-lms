/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';
import Icon, { type IconData } from './Icon';

interface Data {
  id: number;
  type?: string;
}

interface ListItemProps<T> {
  data: T;
  headerEnum: { [key: string]: string };
  showCheckbox?: boolean;
  columnWithIcons?: string[];
  editable?: boolean;
  deletable?: boolean;
  isChecked?: boolean;
  checkboxName?: string;
  onCheckboxChange?: (data: T) => void;
  register?: UseFormRegister<FieldValues>;
  isClickable: boolean;
  handleClick: (traineeId: number) => void;
}

export const ListItem: any = <T extends Data>({
  data,
  showCheckbox = true,
  headerEnum,
  columnWithIcons = [],
  editable = true,
  deletable = true,
  isChecked = false,
  checkboxName = '',
  onCheckboxChange,
  isClickable,
  register,
  handleClick,
}: ListItemProps<T>) => {
  return (
    <tr
      className={`even:bg-neutral-50 whitespace-nowrap text-[13px] text-lightGray3 font-sans h-[49px] group transition-all ease-out duration-200 ${
        isClickable && 'cursor-pointer hover:bg-neutral-100'
      }`}
      onClick={() => {
        isClickable && handleClick(data.id);
      }}
    >
      {showCheckbox && (
        <td className="p-4">
          <input
            type="checkbox"
            checked={isChecked}
            {...register?.(checkboxName, {
              onChange: (e) => {
                onCheckboxChange?.(e.target.value);
              },
            })}
            value={JSON.stringify(data)}
            className="h-5 w-5 cursor-pointer accent-checkbox"
          />
        </td>
      )}

      {Object.values(headerEnum).map((column: string, index) => {
        const item = data[column as keyof typeof data];
        const instanceOfA = (object: any): object is IconData => {
          return 'type' in object;
        };

        const showIcon = columnWithIcons.includes(column) && instanceOfA(data);

        return (
          <td key={index} className="px-6 py-4">
            <div className="flex items-center space-x-2">
              {showIcon && <Icon item={data} className="h-6 w-6 text-lightBlue" />}
              {column === headerEnum.Actions && (
                <div className="flex invisible items-center group-hover:visible">
                  {editable && <EditIcon className="w-5 h-5 mx-1 cursor-pointer" />}
                  {deletable && <TrashIcon className="w-5 h-5 mx-1 text-red-600 cursor-pointer" />}
                </div>
              )}
              <p className="text-neutral-900">
                {item instanceof Date ? item.toLocaleDateString() : (item as string)}
              </p>
            </div>
          </td>
        );
      })}
    </tr>
  );
};
