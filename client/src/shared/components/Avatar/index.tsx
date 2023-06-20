import Image from 'next/image';
import React, { type FC } from 'react';
interface AvatarProp {
  src?: string | null | undefined;
}
const Avatar: FC<AvatarProp> = ({ src = null }) => {
  return (
    <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center relative overflow-hidden">
      <Image src={src ?? '/default-icon.webp'} height={100} width={100} alt="profile_picture" />
    </div>
  );
};

export default Avatar;
