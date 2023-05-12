import Image from 'next/image';
import React, { useState } from 'react';

const Avatar: React.FC = () => {
  // Later on there will be a logic down below that checks if logged in user has a profile picture or not, and changes the state if user does
  const [profilePic] = useState<string | null>(null);

  return (
    <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center relative overflow-hidden">
      <Image
        src={profilePic ?? '/default_profile_pic.webp'}
        height={100}
        width={100}
        alt="profile_picture"
      />
    </div>
  );
};

export default Avatar;
