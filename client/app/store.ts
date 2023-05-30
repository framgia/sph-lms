import { getCourse } from '@/services/courseAPI';
import { getCourseTrainee } from '@/services/traineeAPI';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import courseReducer from '../features/course/courseSlice';
import lessonModalsReducer from '../features/course/lessonModalsSlice';
import stepperReducer from '../features/stepper/stepperSlice';
import tabReducer from '../features/tab/tabSlice';
import learnerReducer from '../features/course/learnerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseReducer,
    courseLearner: learnerReducer,
    lessonModals: lessonModalsReducer,
    stepper: stepperReducer,
    tab: tabReducer,
    [getCourse.reducerPath]: getCourse.reducer,
    [getCourseTrainee.reducerPath]: getCourseTrainee.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(getCourse.middleware)
      .concat(getCourseTrainee.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
