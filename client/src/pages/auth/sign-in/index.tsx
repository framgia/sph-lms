import React from 'react';
import SunBearLogo from '@/src/shared/icons/SunBear';
import Button from '@/src/shared/components/Button';
import GoogleIcon from '@/src/shared/icons/GoogleIcon';

const SignIn: React.FC = () => {
  return (
    <div className="bg-[#FDFBFB] h-screen flex justify-center items-center">
      <div
        className="w-[25rem] h-[34rem] bg-white rounded-[5px] gap-12 px-8 flex justify-center flex-col items-center border border-[#E9E2E2] bg-gradient-to-b"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(245, 211, 207, 0) 0%, rgba(245, 211, 207, 0.337423) 58.85%, #F5D3CF 84.9%)',
        }}
      >
        <div className="flex flex-col w-full items-center">
          <SunBearLogo width={104} height={104} />
          <div className="text-[2rem] mb-2 font-lora font-semibold tracking-[-0.04em]">
            <span className="text-primary-base spacing font-semibold">Sun</span>
            <span className="text-neutral-900">Learning</span>
          </div>
          <p className="text-base font-normal font-inter text-neutral-700 tracking-[0.11em]">
            Training and facilitating growth.
          </p>
        </div>
        <div className="w-full">
          <Button
            text="Sign in with Google"
            buttonClass="text-primary-base border border-primary-base font-inter !font-normal text-sm flex items-center justify-center gap-[10px] py-2 px-4 w-full"
            onClick={() => {
              alert('Google Sign In');
            }}
          >
            <div className="self-end pb-[1px]">
              <GoogleIcon />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
