import type { TrainerLearningPath } from '@/src/shared/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface TrainerLearningPathData {
  learningPaths: TrainerLearningPath[];
  page: number;
}

const initialState: TrainerLearningPathData = {
  learningPaths: [],
  page: 1,
};

const trainerLearningPathSlice = createSlice({
  name: 'trainerLearningPaths',
  initialState,
  reducers: {
    addTrainerLearningPaths: (state, action: PayloadAction<TrainerLearningPath[]>) => {
      const newLearningPaths = action.payload.filter((learningPath) => {
        return !state.learningPaths.some(
          (existingLearningPath) => existingLearningPath.id === learningPath.id
        );
      });
      state.learningPaths.push(...newLearningPaths);
    },
    seeMoreLearningPaths: (state) => {
      state.page += 1;
    },
    resetTrainerLearningPaths: (state) => {
      state.learningPaths = [];
      state.page = 1;
    },
  },
});

export const { addTrainerLearningPaths, seeMoreLearningPaths, resetTrainerLearningPaths } =
  trainerLearningPathSlice.actions;

export default trainerLearningPathSlice.reducer;
