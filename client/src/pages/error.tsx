import { useRouter } from 'next/router';
import SunBear from '../shared/icons/SunBear';
import Button from '../shared/components/Button';
import { useSession } from 'next-auth/react';

interface ErrorLayoutProps {
  statusCode: number;
  title: string;
  subtitle: string;
}

const ErrorPageLayout = ({ statusCode, title, subtitle }: ErrorLayoutProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-[#FDFBFB] h-screen flex justify-center items-center">
      <div
        className="py-32 px-20 rounded-[5px] w-[41rem] flex justify-center"
        style={{
          background:
            'linear-gradient(180deg, rgba(245, 211, 207, 0) 0%, rgba(245, 211, 207, 0.34) 59%, #F5D3CF 85%)',
        }}
      >
        <div className="flex gap-4">
          <SunBear height={120} width={120} />
          <div className="flex flex-col gap-2 items-start">
            <div className="text-primary-base text-[4rem] font-semibold leading-[4.96rem]">
              {statusCode}
            </div>
            <div className="flex gap-1 flex-col text-dark">
              <div className="text-xl font-semibold leading-[1.55rem]">{title}</div>
              <div className="text-base leading-[1.5rem]">{subtitle}</div>
            </div>
            <Button
              text="Go back to home page"
              buttonClass="text-primary-base text-xs leading-[1.125rem] font-medium border border-primary-base rounded-[5px] py-1 px-4"
              onClick={() => {
                void router.replace(
                  `${session?.user?.is_trainer ? '/trainer/dashboard' : '/trainee/dashboard'}`
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageLayout;
