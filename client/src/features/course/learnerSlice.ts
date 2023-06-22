import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Trainee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  progress: number;
}

interface TraineeData {
  trainees: Trainee[];
  page: number;
  selectedSortOption: string;
}

const initialState: TraineeData = {
  trainees: [],
  page: 1,
  selectedSortOption: 'A - Z',
};

const learnerSlice = createSlice({
  name: 'learners',
  initialState,
  reducers: {
    addTrainees: (state, action: PayloadAction<Trainee[]>) => {
      const newTrainees = action.payload.filter((trainee) => {
        return !state.trainees.some((existingTrainee) => existingTrainee.id === trainee.id);
      });
      state.trainees.push(...newTrainees);
    },
    seeMoreTrainees: (state) => {
      state.page += 1;
    },
    resetTraineesList: (state: TraineeData, action: PayloadAction<string>) => {
      state.trainees = [];
      state.page = 1;
      state.selectedSortOption = action.payload;
    },
  },
});

export const { addTrainees, seeMoreTrainees, resetTraineesList } = learnerSlice.actions;

export default learnerSlice.reducer;
