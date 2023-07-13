/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface StepperState {
  activeStep: number;
  isStepValid: boolean;
  isLoading: boolean;
}

const initialState: StepperState = {
  activeStep: 0,
  isStepValid: true,
  isLoading: false,
};

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setIsStepValid: (state, action: PayloadAction<boolean>) => {
      state.isStepValid = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    reset: (state) => {
      return (state = initialState);
    },
  },
});

export const { setActiveStep, setIsStepValid, setLoading, reset } = stepperSlice.actions;

export default stepperSlice.reducer;
