import { type FC } from 'react';
import { MutatingDots } from 'react-loader-spinner';

const Spinner: FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <MutatingDots
        height="100"
        width="100"
        color="#FF0000"
        secondaryColor="#FF0000"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
