/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import React, { type FC } from 'react';
import SunBearLogo from '@/src/shared/icons/SunBear';
import Button from '@/src/shared/components/Button';
import GoogleIcon from '@/src/shared/icons/GoogleIcon';
import { signIn, getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { settings } from '@/src/pages/api/auth/[...nextauth]';

interface SingInProp {
  providers: Array<{ id: string; name: string }>;
}

const SignIn: FC<SingInProp> = ({ providers }) => {
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
          {Object.values(providers).map((provider) => (
            <Button
              key={provider.name}
              text="Sign in with Google"
              buttonClass="text-primary-base border border-primary-base font-inter !font-normal text-sm flex items-center justify-center gap-[10px] py-2 px-4 w-full"
              onClick={async () => await signIn(provider.id)}
            >
              <div className="self-end pb-[1px]">
                <GoogleIcon />
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    settings(context.req as NextApiRequest, context.res as NextApiResponse)
  );

  if (session) {
    const route = session.user.is_trainer ? '/trainer/dashboard' : '/trainee/dashboard';
    return { redirect: { destination: route } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
