import ErrorPageLayout from '../shared/layouts/Error';

const ServerCrash = (): JSX.Element => {
  return (
    <ErrorPageLayout
      statusCode={500}
      title="Oops, something went wrong."
      subtitle="The server crashed. Try to refresh this page."
    />
  );
};

export default ServerCrash;
