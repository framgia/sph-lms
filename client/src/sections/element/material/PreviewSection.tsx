import Iframe from '@/src/shared/components/Iframe';
import { getFileType, getYouTubeEmbedLink } from '@/src/shared/utils/helper';
import Image from 'next/image';
import { type FC, Fragment } from 'react';

interface PreviewSectionProps {
  type: string;
  link: string;
}

const PreviewSection: FC<PreviewSectionProps> = ({ type, link }) => {
  const uniType = getFileType(type);

  switch (uniType) {
    case 'Link':
      return (
        <a
          className="mb-4 font-bold py-2 px-3 rounded mx-1 bg-blue-500 text-white"
          href={link}
          target="_blank"
        >
          Link
        </a>
      );
    case 'Picture':
      return (
        <Image
          src={link}
          height={1000}
          width={1000}
          alt="preview_picture"
          className="h-auto"
        />
      );
    case 'Video': {
      // for now url only supports youtube links for iframe, and it need to be enhanced depending on other links
      const url =
        type.toUpperCase() === 'YOUTUBE' ? getYouTubeEmbedLink(link) : link;
      return <Iframe src={url} />;
    }
    default:
      return (
        <Fragment>
          Unfortunately, This file does not support preview for now
        </Fragment>
      );
  }
};

export default PreviewSection;
