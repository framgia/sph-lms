import { type ReactElement } from 'react';

/* eslint-disable @typescript-eslint/array-type */
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
  title: string;
  description: string;
  ratings: number;
  categories: CourseCategory[];
  is_active: boolean;
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

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: {
    title: string;
  };
  status: string;
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
}
