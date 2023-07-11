/* eslint-disable @typescript-eslint/array-type */
import { type ReactElement } from 'react';
import type { User as NextAuthUser } from 'next-auth';

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
}

export interface Course {
  id: number;
  image: string;
  name: string;
  description: string;
  ratings: number;
  categories: CourseCategory[];
  lessons: Lesson[];
  is_active: boolean;
  order: number;
}

export interface CourseCategory {
  id: number;
  name: string;
}

export interface CourseParams {
  is_active: boolean;
  course_category?: string;
}

export interface UserList {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
}
export interface ClassList {
  class_name: string;
  class_trainer: string;
  number_of_trainees: number;
  number_of_courses: number;
}

export interface Progress {
  name: string;
  percentage: number;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  image: string;
  course?: Progress;
  created_at: string;
  updated_at: string;
}

export interface ClassFormInputs {
  class: string;
}

export interface AuthFormInput {
  email: string;
  password: string;
}

export interface UserCreateFormData {
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UserUpdateDeleteFormData {
  id: number;
  username: string;
  role_id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
}

export interface CourseFormInput {
  name: string;
  description: string;
  category: { value: number; label: string }[];
}

export interface MultiSelectOptionData {
  value: number;
  label: string;
}

export interface IsActiveProps {
  isActive: boolean;
}

export interface MaterialFormInput {
  name: string;
  link: FileList; // it can accept string, but can also accept file, update accordingly
  type?: string;
  description?: string;
  directory?: number;
  category?: number;
  course?: number;
}

export interface DivCollapseProps {
  label: string;
  children: React.ReactNode;
}

export interface ModalProps {
  children?: any;
  isOpen: boolean;
  className?: string;
  width?: number;
}

export interface TabButtonProps {
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

export interface ChildElement {
  id: number;
  title: string;
  childContent: ReactElement;
}

export type ChildElementObject = Record<number, ChildElement>;

export interface LessonForm {
  title: string;
  link: string;
}

export interface Lesson extends LessonForm {
  id: string;
  order: number;
}

export interface Learner {
  id: number;
  progress: number;
  firstname: string;
  lastname: string;
}

export interface DBCourse {
  id: number;
  name: string;
  description: string;
  category: CourseCategory[];
  lessons: Lesson[];
  image: string | null;
}

export interface CourseLearner {
  trainee_id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  progress: number;
}

export interface CourseCollection {
  id: number;
  categories: CourseCategory[];
  lessons: Lesson[];
  name: string;
  description: string | null;
  image: string | null;
  progress?: number;
}

export interface CourseData {
  course: CourseCollection;
}

export interface TrainerLearningPath {
  id: number;
  name: string;
  course_count: number;
}

export interface LearningPath extends TrainerLearningPath {
  description: string;
  image: string;
  courses: Course[];
  category: CourseCategory[];
  is_active: boolean;
}

export interface TrainerCourse {
  id: number;
  name: string;
  lesson_count: number;
}

export interface AuthenticatedUser extends NextAuthUser {
  accessToken?: string;
  refreshToken?: string;
}
