import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { updateForm } from '@/features/learning-path/learningPathSlice';
import { useGetCoursesQuery } from '@/services/courseAPI';
import Button from '@/src/shared/components/Button';
import Modal from '@/src/shared/components/Modal/Modal';
import Pagination from '@/src/shared/components/Pagination';
import SearchBar from '@/src/shared/components/SearchBar/SearchBar';
import Table from '@/src/shared/components/Table';
import { ListItem } from '@/src/shared/components/Table/ListItem';
import XmarkIcon from '@/src/shared/icons/XmarkIcon';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type Course } from '../../../shared/utils/interface';

enum HeaderEnum {
  Name = 'name',
  Uploaded_By = 'author',
  Data_Uploaded = 'created_at',
  Date_Modified = 'updated_at',
}

interface CourseModalProps {
  title: string;
  state: boolean;
  submitButtonTitle?: string;
  closeModal: () => void;
}

interface CourseModalForm {
  courses: string[];
}

const CourseModal = ({
  state,
  submitButtonTitle = 'Submit',
  title,
  closeModal,
}: CourseModalProps): JSX.Element => {
  const { courses } = useAppSelector((state) => state.learningPath.values);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit } = useForm<CourseModalForm>();

  const { data: { results: courseData = [], totalPages, current_page_number: currentPage } = {} } =
    useGetCoursesQuery({ search, page, pageSize: 5 });

  useEffect(() => {
    setSelectedCourses(courses);
  }, [courses]);

  const handleSearch = (search: string): void => {
    setSearch(search);
    setPage(1);
  };

  const handleChangePageEvent = (page: number): void => {
    setPage(page);
  };

  const handleClose = (): void => {
    setSelectedCourses(courses);
    closeModal();
    reset();
  };

  const handleCheckboxChange = (data: string): void => {
    const newData: Course = JSON.parse(data);
    if (selectedCourses.some((course) => course.id === newData.id)) {
      setSelectedCourses(selectedCourses.filter((course) => course.id !== newData.id));
    } else setSelectedCourses([...selectedCourses, newData]);
  };

  const updateCoursesOrder = (courses: Course[]): Course[] => {
    return courses.map((course, index) => ({ ...course, order: index }));
  };

  const removeUncheckedCourses = (courses: Course[], serializedCourses: Course[]): Course[] => {
    return updateCoursesOrder(
      courses.filter((course) => serializedCourses.some((c) => c.id === course.id))
    );
  };

  const onSubmit = (): void => {
    let parsedCourses = [...courses];

    if (parsedCourses.length) {
      parsedCourses = removeUncheckedCourses(courses, selectedCourses);
    }

    selectedCourses.forEach((course) => {
      if (!parsedCourses.some((c) => c.id === course.id)) {
        parsedCourses.push({ ...course, order: parsedCourses.length });
      }
    });

    dispatch(updateForm({ courses: parsedCourses }));
    closeModal();
    reset();
    setSearch('');
    setPage(1);
  };

  return (
    <Modal isOpen={state}>
      <div className="flex flex-col">
        <div className="flex justify-between p-4">
          <h2 className="text-base font-medium text-neutral-900">{title}</h2>
          <XmarkIcon className="cursor-pointer" onClick={handleClose} />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <SearchBar placeholder="Search" onSearchEvent={handleSearch} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table
              checkbox={false}
              sortable={false}
              header={[
                { text: 'Name' },
                { text: 'Uploaded by' },
                { text: 'Date uploaded' },
                { text: 'Date modified' },
              ]}
            >
              {courseData.map((data: Course) => {
                return (
                  <ListItem<Course>
                    key={data.id}
                    data={data}
                    headerEnum={HeaderEnum}
                    register={register}
                    checkboxName="courses"
                    isChecked={selectedCourses.some((course) => course.id === data.id)}
                    onCheckboxChange={handleCheckboxChange}
                  />
                );
              })}
            </Table>
            <div className="flex justify-center items-center h-14">
              <Pagination
                maxPages={5}
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={handleChangePageEvent}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleClose}
                buttonClass="border border-textGray py-[6px] !px-4 !font-medium"
                text="Cancel"
              />
              <Button
                type="submit"
                disabled={!selectedCourses.length}
                buttonClass={`border border-red !text-red py-[6px] !w-36 !font-medium ${
                  !selectedCourses.length ? 'opacity-50 !border-red' : ''
                }`}
                text={submitButtonTitle}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
