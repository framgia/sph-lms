import type { TrainerCourse } from '@/src/shared/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface TrainerCouseData {
  courses: TrainerCourse[];
  page: number;
}

const initialState: TrainerCouseData = {
  courses: [],
  page: 1,
};

const trainerCourseSlice = createSlice({
  name: 'trainerCourses',
  initialState,
  reducers: {
    addTrainerCourses: (state, action: PayloadAction<TrainerCourse[]>) => {
      const newCourses = action.payload.filter((course) => {
        return !state.courses.some((existingCourse) => existingCourse.id === course.id);
      });
      state.courses.push(...newCourses);
    },
    seeMoreCourses: (state) => {
      state.page += 1;
    },
    resetTrainerCourses: (state) => {
      state.courses = [];
      state.page = 1;
    },
  },
});

export const { addTrainerCourses, seeMoreCourses, resetTrainerCourses } =
  trainerCourseSlice.actions;

export default trainerCourseSlice.reducer;
