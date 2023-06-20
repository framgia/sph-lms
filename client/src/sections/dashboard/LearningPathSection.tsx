import DashboardCard from '@/src/shared/components/Card/DashboardCard';
import ShowIcon from '@/src/shared/icons/ShowIcon';

const LearningPathSection = (): JSX.Element => {
  const cardsData: any = [];
  for (let i = 1; i <= 10; i++) {
    cardsData.push({
      id: i,
      title: `Vue Mastery ${i}`,
      subText: '3 Courses',
    });
  }

  return (
    <div className="p-4 mt-[-1rem]">
      {cardsData.length ? (
        <div className="flex flex-col gap-4">
          <span className="text-xs text-neutral-disabled">Ranked by progress %</span>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardsData.map((card: any) => (
              <DashboardCard
                key={card.id}
                title={card.title}
                subText={card.subText}
                link={`/trainer/learning-paths/${card.id}`}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <ShowIcon />
            <span className="text-xs underline underline-offset-4 cursor-pointer">
              See more Learning Paths
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-sm text-neutral-disabled">
          No learning paths to show
        </div>
      )}
    </div>
  );
};

export default LearningPathSection;
