/* eslint-disable @typescript-eslint/no-floating-promises */
import type React from 'react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/src/apis';

export interface Course {
  id: number;
  title: string;
  is_active: boolean;
  description: string;
  course_category: CourseCategory;
  created_at: string;
}

export interface CourseParams {
  is_active: boolean;
  course_category?: string;
}

export interface CourseCategory {
  id: number;
  name: string;
}

export interface FilterCourseState {
  courses: Course[];
  categories: CourseCategory[];
  selectedCategories: Array<{ id: number; selected: boolean }>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleCategoryChange: (categoryId: number) => void;
}

const useFilterCourse = (): FilterCourseState => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
  Array<{ id: number; selected: boolean }>
  >([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async (): Promise<void> => {
      let endpoint = '/course/';
      const params: Record<string, string> = { is_active: isActive.toString() };
      if (selectedCategories.length > 0) {
        const categoryIds = selectedCategories
          .filter((cat) => cat.selected)
          .map((cat) => cat.id)
          .join(',');
        params.course_category = categoryIds;
      }
      endpoint += `?${new URLSearchParams(params).toString()}`;
      const result = await axiosInstance.get<Course[]>(endpoint);
      setCourses(result.data);
    };
    fetchCourses();
  }, [isActive, selectedCategories]);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const result = await axiosInstance.get<CourseCategory[]>(
          '/course-category/'
        );
        if (result.status === 200) {
          setCategories(result.data);
          setSelectedCategories(
            result.data.map((cat) => ({ id: cat.id, selected: false }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number): void => {
    setSelectedCategories((prevState) =>
      prevState.map((cat) => {
        if (cat.id === categoryId) {
          return { id: categoryId, selected: !cat.selected };
        } else {
          return cat;
        }
      })
    );
  };

  return {
    courses,
    categories,
    selectedCategories,
    isActive,
    setIsActive,
    handleCategoryChange
  };
};

export default useFilterCourse;
