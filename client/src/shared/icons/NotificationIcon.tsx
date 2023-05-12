import { type FC } from 'react';

interface NotificationIconProps {
  className?: string;
}

const NotificationIcon: FC<NotificationIconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.87871 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7957 2 13.5587 2.31607 14.1214 2.87868C14.6043 3.36165 14.9056 3.99234 14.9812 4.66455C16.0719 5.17819 17.0154 5.96673 17.7159 6.95768C18.5515 8.13996 19.0002 9.5522 19 11C19 11 19 11 19 11V14.158C19 14.2935 19.0267 14.4279 19.0785 14.5531C19.1304 14.6783 19.2064 14.7921 19.3021 14.8879C19.3021 14.8879 19.3022 14.8879 19.3021 14.8879L20.7071 16.2929C20.9931 16.5789 21.0787 17.009 20.9239 17.3827C20.7691 17.7564 20.4045 18 20 18H16C16 19.0609 15.5786 20.0783 14.8285 20.8284C14.0783 21.5786 13.0609 22 12 22C10.9392 22 9.92175 21.5786 9.1716 20.8284C8.42146 20.0783 8.00003 19.0609 8.00003 18H4.00003C3.59557 18 3.23093 17.7564 3.07615 17.3827C2.92137 17.009 3.00692 16.5789 3.29292 16.2929L4.69792 14.8879C4.8914 14.6944 5.00003 14.4318 5.00003 14.159V11C5.00003 8.19928 6.64515 5.78419 9.01881 4.66475C9.09439 3.99246 9.39569 3.3617 9.87871 2.87868ZM10 18C10 18.5304 10.2107 19.0391 10.5858 19.4142C10.9609 19.7893 11.4696 20 12 20C12.5305 20 13.0392 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18H10ZM12 4C11.7348 4 11.4805 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V5.341C11 5.76475 10.7329 6.1425 10.3334 6.28378C8.39031 6.97097 7.00003 8.82501 7.00003 11V14.159C7.00003 14.8276 6.77873 15.4742 6.37664 16H17.6235C17.4638 15.7912 17.3317 15.5621 17.2307 15.3182C17.0784 14.9504 17 14.5561 17 14.158C17 14.1579 17 14.1581 17 14.158V11C17.0002 9.96571 16.6797 8.95669 16.0827 8.11209C15.4857 7.26749 14.6415 6.62872 13.6665 6.28373C13.267 6.1424 13 5.7647 13 5.341V5C13 4.73478 12.8947 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4Z"
        fill="#2F302C"
      />
      <rect
        x="13.5"
        width="11.0769"
        height="11.0769"
        rx="5.53846"
        fill="#FF0000"
      />
      <path
        d="M18.9816 2.64085C19.26 2.64274 19.5309 2.69198 19.7941 2.78857C20.0593 2.88327 20.2979 3.03857 20.51 3.25448C20.7222 3.4685 20.8907 3.75543 21.0157 4.11528C21.1407 4.47513 21.2032 4.9202 21.2032 5.45051C21.2051 5.95051 21.1521 6.39748 21.0441 6.79142C20.9381 7.18346 20.7856 7.5149 20.5867 7.78573C20.3879 8.05657 20.1483 8.26301 19.868 8.40505C19.5877 8.5471 19.2724 8.61812 18.922 8.61812C18.5546 8.61812 18.2288 8.54615 17.9447 8.40221C17.6625 8.25827 17.4343 8.0613 17.26 7.8113C17.0858 7.5613 16.9788 7.27532 16.939 6.95335H17.976C18.029 7.18441 18.1369 7.36812 18.2998 7.50448C18.4646 7.63895 18.672 7.70619 18.922 7.70619C19.3254 7.70619 19.636 7.531 19.8538 7.18062C20.0716 6.83024 20.1805 6.3435 20.1805 5.72039H20.1407C20.0479 5.88706 19.9277 6.031 19.7799 6.15221C19.6322 6.27153 19.4646 6.36338 19.2771 6.42778C19.0915 6.49217 18.8945 6.52437 18.6862 6.52437C18.3453 6.52437 18.0385 6.44293 17.7657 6.28005C17.4949 6.11717 17.2799 5.89369 17.1208 5.6096C16.9636 5.32551 16.8841 5.0007 16.8822 4.63516C16.8822 4.25638 16.9693 3.91642 17.1436 3.61528C17.3197 3.31225 17.565 3.07361 17.8794 2.89937C18.1938 2.72323 18.5612 2.63706 18.9816 2.64085ZM18.9845 3.49312C18.7799 3.49312 18.5953 3.54331 18.4305 3.64369C18.2676 3.74217 18.1388 3.87664 18.0441 4.0471C17.9513 4.21566 17.9049 4.4041 17.9049 4.61244C17.9068 4.81888 17.9532 5.00638 18.0441 5.17494C18.1369 5.3435 18.2629 5.47702 18.422 5.57551C18.583 5.67399 18.7667 5.72323 18.9731 5.72323C19.1265 5.72323 19.2695 5.69388 19.4021 5.63516C19.5347 5.57645 19.6502 5.49501 19.7487 5.39085C19.8491 5.28479 19.9267 5.16452 19.9816 5.03005C20.0385 4.89558 20.0659 4.75354 20.064 4.60391C20.064 4.40505 20.0167 4.22134 19.922 4.05278C19.8292 3.88422 19.7013 3.7488 19.5385 3.64653C19.3775 3.54426 19.1928 3.49312 18.9845 3.49312Z"
        fill="white"
      />
    </svg>
  );
};

export default NotificationIcon;
