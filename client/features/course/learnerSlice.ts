import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Trainee {
  trainee_id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  progress: number;
}

interface TraineeData {
  trainees: Trainee[];
  page: number;
  isEnrollee: boolean;
}

const initialState: TraineeData = {
  trainees: [],
  page: 1,
  isEnrollee: true,
};

const learnerSlice = createSlice({
  name: 'learners',
  initialState,
  reducers: {
    addTrainees: (state, action: PayloadAction<Trainee[]>) => {
      const newTrainees = action.payload.filter((trainee) => {
        return !state.trainees.some(
          (existingTrainee) =>
            existingTrainee.trainee_id === trainee.trainee_id ||
            existingTrainee.user_id === trainee.user_id
        );
      });
      state.trainees.push(...newTrainees);
    },
    resetTrainees: (state) => {
      state.trainees = [];
      state.page = 1;
    },
    toggleLearner: (state) => {
      state.isEnrollee = !state.isEnrollee;
    },
    seeMoreTrainees: (state) => {
      state.page += 1;
    },
  },
});

export const { addTrainees, resetTrainees, toggleLearner, seeMoreTrainees } = learnerSlice.actions;

export default learnerSlice.reducer;
