import ErrorPageLayout from '../shared/layouts/Error';

const PageNotFound = (): JSX.Element => {
  return (
    <ErrorPageLayout
      statusCode={404}
      title="Oops, page not found."
      subtitle="The page you were looking for does not exist."
    />
  );
};

export default PageNotFound;
