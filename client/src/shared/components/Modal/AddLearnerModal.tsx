/* eslint-disable @typescript-eslint/indent */
import {
  type useGetLearnerQuery,
  type useGetLearningPathLearnerQuery,
} from '@/services/traineeAPI';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import CloseIcon from '@/src/shared/icons/CloseIcon';
import { type Learner } from '@/src/shared/utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface AddLearnerModalProps {
  useGetLearnerQuery?: typeof useGetLearnerQuery;
  useGetLearningPathLearnerQuery?: typeof useGetLearningPathLearnerQuery;
  handleModal: () => void;
}

const AddLearnerModal: React.FC<AddLearnerModalProps> = ({
  useGetLearnerQuery,
  useGetLearningPathLearnerQuery,
  handleModal,
}: AddLearnerModalProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const params = router.query;
  const courseID = params.id;

  const query = useGetLearnerQuery ?? useGetLearningPathLearnerQuery;
  const { data: trainee } = query
    ? query({
        courseId: courseID,
        isEnrolled: false,
        pageNumber: page,
        searchQuery: search,
      })
    : { data: null };

  const enrollees = trainee?.learners.data;
  const totalPages = trainee?.learners.total_pages;

  const handleAddLearners = (): void => {
    alert('Add Learners');
  };

  const handleSearch = (search: string): void => {
    setSearch(search);
    setPage(1);
  };

  const handleCheckboxChange = (id: number): void => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  return (
    <div>
      <Modal className="w-[521px]" isOpen={true}>
        <div className="p-4 overflow-y-auto ">
          <div className="flex justify-between mb-6">
            <span className="text-gray-600 font-bold">Add Learner</span>
            <div onClick={handleModal}>
              <CloseIcon className="cursor-pointer w-[30px] h-[30px]" />
            </div>
          </div>
          <div className="my-4">
            <SearchBar
              placeholder="Search"
              onSearchEvent={handleSearch}
              searchClass="w-[400px] text-[14px] text-lightGray3"
            />
            <div className="grid">
              <table className="mt-4">
                <thead>
                  <tr>
                    <th className="bg-lightGray2 rounded-tl-md"></th>
                    <th className="bg-lightGray2 py-[16px] text-[14px] text-lightGray3 font-[500] leading-[21px] text-start">
                      First Name
                    </th>
                    <th className="bg-lightGray2 py-[16px] text-[14px] text-lightGray3 font-[500] leading-[21px] text-start rounded-tr-md">
                      Last Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* TABLE ROW  */}
                  {enrollees?.map((col: Learner) => (
                    <tr
                      className={` ${col.id % 2 === 0 ? '' : 'bg-gray-100'} align-middle `}
                      key={col.id}
                    >
                      <td className="grid place-items-center py-3">
                        <input
                          className="w-[15px] h-[15px] accent-black"
                          type="checkbox"
                          value={col.id}
                          checked={selectedIds.includes(col.id)}
                          onChange={() => {
                            handleCheckboxChange(col.id);
                          }}
                        />
                      </td>
                      <td className="text-[13px] py-2">{col.firstname}</td>
                      <td className="text-[13px] py-2">{col.lastname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* LEARNERS FULLNAME PAGINATION */}
            <div className="flex justify-center my-5">
              <Pagination
                maxPages={5}
                totalPages={totalPages}
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
              onClick={handleModal}
            />
            <Button
              text="Add Learners"
              buttonClass={`!bg-white px-6 border-2 !border-red rounded-md ${
                !selectedIds.length ? 'opacity-50' : ''
              }`}
              textColor="!text-red"
              onClick={handleAddLearners}
              disabled={!selectedIds.length}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddLearnerModal;
