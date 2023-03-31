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

export interface UserList {
  first_name: string,
  last_name: string,
  email: string,
  role: string
}
