import { type SortOption } from '@/src/shared/components/Dropdown/SortDropdown/SortDropdown';
import ArrowIcon from '@/src/shared/icons/ArrowIcon';

export const DropDownOptions: SortOption[] = [
  { label: 'A - Z', value: 'A - Z' },
  { label: 'Z - A', value: 'Z - A' },
  {
    label: 'Progress',
    value: 'Progress Asc',
    icon: <ArrowIcon className="transform rotate-90" />,
  },
  {
    label: 'Progress',
    value: 'Progress Desc',
    icon: <ArrowIcon className="transform -rotate-90" />,
  },
];
