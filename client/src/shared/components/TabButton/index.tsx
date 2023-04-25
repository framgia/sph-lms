import React from 'react';
import Button from '../Button';

export interface TabButtonProps {
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

const TabButton: React.FunctionComponent<TabButtonProps> = ({
  text,
  isActive,
  onClick
}: TabButtonProps) => {
  return (
    <Button
      text={text}
      width="w-full rounded-none"
      color={isActive ? 'bg-gray-50 mb-0' : 'bg-gray-200'}
      textColor={`text-gray-500 text-left ${
        isActive ? 'font-bold' : 'font-normal'
      }`}
      hover="hover:bg-gray-50 mb-0"
      onClick={onClick}
    />
  );
};

export default TabButton;
