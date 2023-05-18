import type { CourseCategory, Lesson } from '@/src/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CourseState {
  values: {
    name: string;
    description: string;
    image: File | null;
    category: CourseCategory[];
    lessons: Lesson[];
  };
  editMode: boolean;
}

const initialState: CourseState = {
  values: { name: '', description: '', image: null, lessons: [], category: [] },
  editMode: true,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.values.lessons = [...state.values.lessons, action.payload];
    },
    addCategory: (state, action: PayloadAction<CourseCategory[]>) => {
      state.values.category = action.payload;
    },
    updateLesson: (state, action: PayloadAction<Lesson>) => {
      state.values.lessons = state.values.lessons.map((lesson) =>
        lesson.id === action.payload.id ? action.payload : lesson
      );
    },
    deleteLesson: (state, action: PayloadAction<string>) => {
      state.values.lessons = state.values.lessons.filter((lesson) => lesson.id !== action.payload);
    },
    changeEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
  },
});

export const { updateForm, addLesson, addCategory, updateLesson, deleteLesson, changeEditMode } =
  courseSlice.actions;

export default courseSlice.reducer;
