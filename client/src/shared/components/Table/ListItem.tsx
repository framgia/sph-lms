/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import TdCell from './TdCell';

interface Data {
  type?: string;
}

export interface ListItemProps<T> {
  data: T;
  headerEnum: { [key: string]: string };
  showCheckbox?: boolean;
  columnWithIcons?: string[];
  editable?: boolean;
  deletable?: boolean;
  clickableColumns?: { [key: string]: (data: T) => void };
}

export const ListItem: any = <T extends Data>({
  data,
  showCheckbox = true,
  headerEnum,
  columnWithIcons = [],
  editable = true,
  deletable = true,
  clickableColumns = {}
}: ListItemProps<T>) => {
  return (
    <tr className="border-b whitespace-nowrap text-sm text-black1 font-sans h-5 hover:shadow-md group transition-all ease-out duration-200">
      {showCheckbox && (
        <td className="p-4">
          <input type="checkbox" className="h-5 w-5 cursor-pointer" />
        </td>
      )}

      {Object.values(headerEnum).map((column: string, index) => (
        <TdCell
          column={column}
          key={index}
          data={data}
          headerEnum={headerEnum}
          columnWithIcons={columnWithIcons}
          editable={editable}
          deletable={deletable}
          clickableColumns={clickableColumns}
        />
      ))}
    </tr>
  );
};
