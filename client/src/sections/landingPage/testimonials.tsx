import React from 'react';
import Image from 'next/image';
import type { FC } from 'react';

const Testimonials: FC = () => {
  const testimonies = [
    {
      id: 1,
      full_name: 'Epifanio Villaro',
      testimony: 'I like this website because it is very nice and helpful'
    },
    {
      id: 2,
      full_name: 'Marielle Regner',
      testimony:
        'The UI is very nice and you can easily navigate through the different sections'
    },
    {
      id: 3,
      full_name: 'Mikole Rosales',
      testimony:
        'I love this website and I will recommend this to other developers'
    }
  ];
  return (
    <div className="flex flex-wrap container p-8 mx-auto xl:px-0">
      <div className="h-screen w-auto flex flex-col">
        <div className="flex justify-center text-7xl font-bold pt-10 pb-20">
          What do our users say?
        </div>
        <div className="flex items-center justify-center pl-10 pr-10">
          <div className="grid grid-cols-3 place-items-center">
            {testimonies.map((data) => (
              <div
                key={data.id}
                className="m-3 shadow-2xl h-96 rounded-lg flex justify-between"
              >
                <div className="flex flex-col justify-between">
                  <div className="pt-10 pl-10 pr-5 italic text-2xl ">
                    {data.testimony}
                  </div>
                  <div className="flex flex-col items-center pb-10 space-y-10">
                    <div className="rounded-full bg-gray-300 w-20 h-20 border-4 border-lightBlue flex justify-end relative">
                      <span className="text-center text-white text-sm font-medium">
                        <Image
                          src={'/profile_icon.png'}
                          width="616"
                          height="617"
                          alt="Hero Illustration"
                          loading="eager"
                          className="rounded-full"
                        />
                      </span>
                    </div>
                    <div className="flex items-center font-bold text-xl">
                      {data.full_name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
