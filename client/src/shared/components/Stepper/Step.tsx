import { type FC, Fragment, type ReactElement } from 'react';

export interface StepProps {
  title: string;
  children?: ReactElement;
  nextTitle?: string;
  backTitle?: string;
}

const Step: FC<StepProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

Step.defaultProps = {
  nextTitle: 'Next',
  backTitle: 'Back',
};

export default Step;
