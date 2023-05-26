/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import CloseIcon from '@/src/shared/icons/CloseIcon';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEnrollLearnerMutation, useGetLearnerQuery } from '@/services/traineeAPI';
import { type Trainee, addTrainees, toggleLearner } from '@/features/course/learnerSlice';
import { useAppDispatch } from '@/app/hooks';
import { type RootState } from '@/app/store';

const AddLearnerModal: React.FC = (): JSX.Element => {
  const router = useRouter();
  const params = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedEnrollees, setSelectedEnrollees] = useState<Trainee[]>([]);
  const courseID = params.id;
  const dispatch = useAppDispatch();

  const { isEnrollee } = useSelector((state: RootState) => state.courseLearner);

  const [mutateAsync] = useEnrollLearnerMutation();

  const { data: trainee, refetch } = useGetLearnerQuery({
    courseId: courseID,
    isEnrolled: isEnrollee,
    pageNumber: page,
    searchQuery: search,
  });
  const enrollees = trainee?.learners.data;

  const handleAddMaterialModal = (): void => {
    setSelectedIds([]);
    setSearch('');
    setPage(1);
    setIsModalOpen(!isModalOpen);
    dispatch(toggleLearner());
    if (!isEnrollee) {
      void refetch();
    }
  };

  const handleSearch = (search: string): void => {
    setSearch(search);
    setPage(1);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  const handleCheckboxChange = (id: number): void => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      setSelectedEnrollees(selectedEnrollees.filter((enrollee) => enrollee.trainee_id !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
      const selectedEnrollee = enrollees.find((enrollee: Trainee) => enrollee.trainee_id === id);
      if (selectedEnrollee) {
        setSelectedEnrollees([...selectedEnrollees, selectedEnrollee]);
      }
    }
  };

  const handleAddLearners = async (): Promise<void> => {
    const postData = {
      trainee: selectedIds.join(','),
    };
    try {
      await mutateAsync({
        courseId: courseID,
        postData,
      });
      dispatch(addTrainees(selectedEnrollees));
      handleAddMaterialModal();
    } catch (error) {
      console.error('An error occurred while enrolling learners:', error);
    }
  };

  return (
    <div>
      <Button
        text="Add learner"
        buttonClass="px-4 py-2 text-sm bg-white text-blue-500 border-2 border-red"
        textColor="text-red"
        onClick={handleAddMaterialModal}
      />
      <Modal isOpen={isModalOpen} className="w-[521px]">
        <div className="p-4">
          <div className="flex justify-between mb-6">
            <span className="text-gray-600 font-bold">Add Learner</span>
            <div onClick={handleAddMaterialModal}>
              <CloseIcon className="cursor-pointer w-[30px] h-[30px]" />
            </div>
          </div>
          <div className="my-4">
            <SearchBar
              placeholder="Search"
              onSearchEvent={handleSearch}
              className="w-3/4 text-[14px] text-lightGray3"
            />
            <div className="grid">
              <table className="mt-4">
                <thead>
                  <tr className="">
                    <th className="bg-lightGray2 rounded-tl-md"></th>
                    <th className="bg-lightGray2 py-[13px] text-[15px] font-semibold">
                      First Name
                    </th>
                    <th className="bg-lightGray2 py-[13px] text-[15px] font-semibold rounded-tr-md">
                      Last Name
                    </th>
                  </tr>
                </thead>
                {enrollees?.length > 0 ? (
                  <tbody>
                    {enrollees.map((col: any, index: number) => (
                      <tr
                        className={` ${index % 2 === 0 ? '' : 'bg-gray-100'} align-middle `}
                        key={index}
                      >
                        <td className="grid place-items-center py-3">
                          <input
                            type="checkbox"
                            className="w-[15px] h-[15px] accent-black"
                            checked={selectedIds.includes(col.trainee_id)}
                            onChange={() => {
                              handleCheckboxChange(col.trainee_id);
                            }}
                          />
                        </td>
                        <td className="text-[13px] py-2">{col.firstname}</td>
                        <td className="text-[13px] py-2">{col.lastname}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        <p className="text-center font-semibold text-xl">No enrollees found.</p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <div className="flex justify-center my-5">
              <Pagination
                maxPages={5}
                totalPages={trainee?.learners.total_pages}
                currentPage={page}
                onChangePage={handleChangePageEvent}
              />
            </div>
          </div>
          <div className="flex mb-5">
            <Button
              text="Cancel"
              buttonClass="bg-white px-[14px] py-[5px] border-2 border-gray-500 rounded-md mr-2"
              textColor="text-gray-600"
              onClick={handleAddMaterialModal}
            />
            <Button
              text="Add Learners"
              buttonClass="bg-white px-6 border-2 border-red rounded-md "
              textColor="text-red"
              disabled={!(selectedIds.length > 0)}
              onClick={handleAddLearners}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddLearnerModal;
