import React from 'react';

export interface AvatarProps {
  name: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const getInitials = (name: string): string => {
    const words = name.split(' ');
    const initials = [];

    for (let i = 0; i < words.length; i++) {
      initials.push(words[i][0]);
    }

    return initials.join('').toUpperCase();
  };
  return (
    <div className="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center relative">
      <span className="text-center text-white text-sm font-medium">
        {getInitials(name)}
      </span>
    </div>
  );
};

Avatar.defaultProps = {
  name: ''
};

export default Avatar;
