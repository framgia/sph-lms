import DashboardCard from '@/src/shared/components/Card/DashboardCard';
import ShowIcon from '@/src/shared/icons/ShowIcon';
import React, { Fragment } from 'react';

const LearningPathSection = (): JSX.Element => {
  const cardsData: any = [];
  for (let i = 1; i <= 10; i++) {
    cardsData.push({
      id: i,
      title: `Vue Mastery ${i}`,
      subText: '3 Courses',
    });
  }

  const handleClick = (): void => {
    // Logic for redirection here
    console.log('Clicked');
  };

  return (
    <Fragment>
      <span className="text-xs text-neutral-disabled p-4">Ranked by Progress %</span>
      <div className="grid grid-cols-3 gap-4 mx-5 mt-5">
        {cardsData.map((card: any) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            subText={card.subText}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className="flex gap-1 pt-4 pl-4">
        <ShowIcon />
        <span className="text-xs underline underline-offset-4 cursor-pointer">
          See more Learning Paths
        </span>
      </div>
    </Fragment>
  );
};

export default LearningPathSection;
