import { type FC } from 'react';

interface VideoIconProps {
  className?: string;
}

const VideoIcon: FC<VideoIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={className}
      viewBox="0 0 512 512"
    >
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path d="M216.32 334.44l114.45-69.14a10.89 10.89 0 000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31z" />
    </svg>
  );
};

export default VideoIcon;
