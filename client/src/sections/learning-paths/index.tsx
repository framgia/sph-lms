import { useGetLearningPathsQuery } from '@/services/learningPathAPI';
import LearningPathCard from '@/src/shared/components/Card/LearningPathCard';
import Pagination from '@/src/shared/components/Pagination';
import { alertError, type LearningPath } from '@/src/shared/utils';

interface LearningPathListProps {
  isActive: boolean;
  page: number;
  handleChangePageEvent: (page: number) => void;
}

const LearningPathList = ({
  isActive,
  page,
  handleChangePageEvent,
}: LearningPathListProps): JSX.Element => {
  const { data, error, isLoading } = useGetLearningPathsQuery({
    page,
    isActive,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return alertError('An error occurred');
  }

  const { results, totalPages, current_page_number: currentPage } = data;
  return (
    <div className="flex flex-col justify-center w-full">
      {results.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((learningPath: LearningPath) => (
              <LearningPathCard key={learningPath.id} learningPath={learningPath} />
            ))}
          </div>
          <div className="flex justify-center items-center my-5">
            <Pagination
              maxPages={5}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={handleChangePageEvent}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center text-sm text-gray-400 h-24">
          No learning paths to show
        </div>
      )}
    </div>
  );
};

export default LearningPathList;
