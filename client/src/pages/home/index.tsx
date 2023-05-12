import { Fragment, type ReactNode } from 'react';

const Home = (): ReactNode => {
  return (
    <Fragment>
      <div className="h-screen flex flex-col justify-center items-center bg-blue-100">
        <h1 className="text-5xl font-bold mb-10">
          Welcome to the LMS Homepage
        </h1>
        <p className="text-lg font-medium mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit
          ligula at nibh finibus imperdiet. Duis a dolor ac eros ullamcorper
          consequat quis sed quam.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full shadow-lg">
          Get Started
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
