/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react';
import type { ClassList } from '@/src/shared/utils';

const useShowClassList = (): any => {
  const classList = new Array(100).fill(null).map((a, index) => ({
    class_name: `Class ${index}`,
    class_trainer: `Trainer ${index}`,
    number_of_trainees: index,
    number_of_courses: index
  }));

  const numberOfUsers = classList.length;
  const [limiter, setLimiter] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPerPage, setShowPerPage] = useState<ClassList[]>(
    classList.slice(0, 10)
  );
  const [startingIndex, setStartingIndex] = useState(1);
  const [lastIndex, setLastIndex] = useState(10);

  const handleChangePageEvent = (page: number): void => {
    setShowPerPage(classList.slice(page * limiter - limiter, limiter * page));
    setCurrentPage(page);
    setStartingIndex(limiter * page - limiter + 1);
    setLastIndex(
      limiter * page <= numberOfUsers ? limiter * page : numberOfUsers
    );
  };
  const handleShowPerPage = (e: any): void => {
    const limiter = e.target.value;
    setLimiter(limiter);
    setShowPerPage(classList.slice(0, limiter));
    setStartingIndex(limiter * currentPage - limiter + 1);
    setLastIndex(limiter);
    setStartingIndex(1);
    setCurrentPage(1);
  };

  const showPerPageOption = [
    { id: 10, text: '10' },
    { id: 25, text: '25' },
    { id: 50, text: '50' },
    { id: classList.length, text: `all (${classList.length})` }
  ];

  return {
    showPerPageOption,
    handleChangePageEvent,
    handleShowPerPage,
    showPerPage,
    currentPage,
    lastIndex,
    startingIndex,
    numberOfUsers,
    limiter
  };
};
export default useShowClassList;
