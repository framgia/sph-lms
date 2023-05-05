import { type FC } from 'react';
import FolderIcon from '../../icons/FolderIcon';
import LinkIcon from '../../icons/LinkIcon';
import FileIcon from '../../icons/FileIcon';
import VideoIcon from '../../icons/VideoIcon';
import Image from 'next/image';

const folder = ['FOLDER'];
const link = ['LINK'];
// const file = ['DOCS', 'PPT', 'PDF'];
const picture = ['PNG', 'JPG'];
const video = ['YOUTUBE'];

export interface IconData {
  link?: string;
  type: string;
}

interface IconProps {
  item: IconData;
  className?: string;
  src?: string;
}

const Icon: FC<IconProps> = ({ item, className }) => {
  const iconType = item.type.toUpperCase();

  if (folder.includes(iconType)) {
    return <FolderIcon className={className} />;
  } else if (link.includes(iconType)) {
    return <LinkIcon className={className} />;
  } else if (video.includes(iconType)) {
    return <VideoIcon className={className} />;
  } else if (picture.includes(iconType) && item?.link !== undefined) {
    return (
      <Image
        src={item.link}
        width={500}
        height={500}
        className={className}
        alt="image"
      />
    );
  } else {
    return <FileIcon className={className} />;
  }
};

export default Icon;
