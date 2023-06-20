import Image from 'next/image';
import React, { useState } from 'react';

interface AvatarProps {
  image?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  // Later on there will be a logic down below that checks if logged in user has a profile picture or not, and changes the state if user does
  const [profilePic] = useState<string | null>(image ?? null);

  return (
    <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center relative overflow-hidden">
      <Image
        src={profilePic ?? '/default-icon.webp'}
        height={100}
        width={100}
        alt="profile_picture"
      />
    </div>
  );
};

export default Avatar;
