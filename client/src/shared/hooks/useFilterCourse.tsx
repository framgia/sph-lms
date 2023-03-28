/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react';
import API from '@/src/apis';
import type { Course, CourseCategory } from '../utils/interface';

export interface FilterCourseState {
  courses: Course[];
  categories: CourseCategory[];
  selectedCategories: Array<{ id: number; selected: boolean }>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleCategoryChange: (categoryId: number) => void;
  handleOnSearchEvent: (searchTerm: string) => void;
}

const useFilterCourse = (): FilterCourseState => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
  Array<{ id: number; selected: boolean }>
  >([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async (searchTerm: string = ''): Promise<void> => {
      let endpoint = '/course/';
      const params: Record<string, string> = { is_active: isActive.toString() };
      if (selectedCategories.length > 0) {
        const categoryIds = selectedCategories
          .filter((cat) => cat.selected)
          .map((cat) => cat.id)
          .join(',');
        params.course_category = categoryIds;
      }
      if (searchTerm.length > 0) {
        params.title = searchTerm;
      }
      endpoint += `?${new URLSearchParams(params).toString()}`;
      const result = await API.get<Course[]>(endpoint);
      setCourses(result.data);
    };
    void fetchCourses();
  }, [isActive, selectedCategories]);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const result = await API.get<CourseCategory[]>('/course-category/');
      setCategories(result.data);
    };
    void fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number): void => {
    const updatedCategories = selectedCategories.map((cat) =>
      cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
    );
    setSelectedCategories(updatedCategories);
  };

  const handleOnSearchEvent = async (searchTerm: string): Promise<void> => {
    const params: Record<string, string> = { is_active: isActive.toString() };
    if (selectedCategories.length > 0) {
      const categoryIds = selectedCategories
        .filter((cat) => cat.selected)
        .map((cat) => cat.id)
        .join(',');
      params.course_category = categoryIds;
    }
    if (searchTerm.length > 0) {
      params.title = searchTerm;
    }
    const endpoint = `?${new URLSearchParams(params).toString()}`;
    const result = await API.get<Course[]>(endpoint);
    setCourses(result.data);
  };

  return {
    courses,
    categories,
    selectedCategories,
    isActive,
    setIsActive,
    handleCategoryChange,
    handleOnSearchEvent
  };
};

export default useFilterCourse;
