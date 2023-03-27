import React from 'react';
import Image from 'next/image';
import type { FC } from 'react';

const Benefits: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center text-6xl font-bold pt-10 pb-20 text-red-500">
        Why should you use this Website?
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex flex-row space-x-4">
          <div className="flex-col h-3/4 w-3/4 space-y-2">
            <div className="text-4xl font-bold ">Save Time</div>
            <div className="text-xl">
              E-learning is self-directed, which means students can learn as and
              when it’s convenient for them, all easily and quickly accessible
              via an LMS. It also saves time for administrators organizing
              training courses.
            </div>
          </div>
          <div className="h-1/4">
            <Image
              src={'/save-time.png'}
              width="150"
              height="150"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-col h-3/4 w-3/4 space-y-2">
            <div className="text-4xl font-bold ">Improve Management</div>
            <div className="text-xl">
              An LMS allows for streamlined management and provides
              administrators and managers with all the tools they need to
              support the learning process.
            </div>
          </div>
          <div className="w-1/4">
            <Image
              src={'/improve_management.png'}
              width="150"
              height="150"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
        <div className="flex flex-row  space-x-4">
          <div className="flex-col h-3/4 w-3/4 space-y-2">
            <div className="text-4xl font-bold ">
              Ensure mandatory training is completed
            </div>
            <div className="text-xl">
              Managers can ensure that mandatory training, such as first aid and
              fire safety - and other industry-specific training - is completed
              thoroughly and to a high standard.
            </div>
          </div>
          <div>
            <Image
              src={'/completed.png'}
              width="150"
              height="150"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex-col h-3/4 w-3/4 space-y-2">
            <div className="text-4xl font-bold">
              Provide accurate data to stakeholders
            </div>
            <div className="text-xl">
              Being able to collate accurate data in an easy-to-understand
              format allows businesses to prove to stakeholders that their
              training is effective and offers a return on investment.
            </div>
          </div>
          <div>
            <Image
              src={'/stakeholder.png'}
              width="150"
              height="150"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex-col h-3/4 w-3/4 space-y-2">
            <div className="text-4xl font-bold ">
              Improves the student experience
            </div>
            <div className="text-xl">
              By ensuring all training courses and materials are located in one
              central location it improves the learning experience for students,
              meaning they’re far more likely to engage with and complete
              courses.
            </div>
          </div>
          <div>
            <Image
              src={'/experience.png'}
              width="150"
              height="150"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex-col h-3/4 w-3/4 space-y-2">
            <div className="text-4xl font-bold">Improves communication</div>
            <div className="text-xl">
              An LMS makes communication between students, teachers, and
              employers simpler.
            </div>
          </div>
          <div>
            <Image
              src={'/communication.png'}
              width="150"
              height="150"
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
