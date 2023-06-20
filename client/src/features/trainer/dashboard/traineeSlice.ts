import { type User } from '@/src/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TraineeData {
  trainees: User[];
  page: number;
  selectedSortOption: string;
}

const initialState: TraineeData = {
  trainees: [],
  page: 1,
  selectedSortOption: 'A - Z',
};

const traineeSlice = createSlice({
  name: 'dashboardTrainee',
  initialState,
  reducers: {
    addTrainees: (state, action: PayloadAction<User[]>) => {
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

export const { addTrainees, seeMoreTrainees, resetTraineesList } = traineeSlice.actions;

export default traineeSlice.reducer;
