import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import courseReducer from '../features/course/courseSlice';
import lessonModalsReducer from '../features/course/lessonModalsSlice';
import stepperReducer from '../features/stepper/stepperSlice';
import tabReducer from '../features/tab/tabSlice';
import { getCourse } from '@/services/courseAPI';
import { getCourseTrainee } from '@/services/traineeAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseReducer,
    lessonModals: lessonModalsReducer,
    stepper: stepperReducer,
    tab: tabReducer,
    [getCourse.reducerPath]: getCourse.reducer,
    [getCourseTrainee.reducerPath]: getCourseTrainee.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'course/updateForm',
          'getCourse/executeQuery/fulfilled',
          'getCourseTrainee/executeQuery/fulfilled',
        ],
        ignoredActionPaths: ['payload.image'],
        ignoredPaths: ['course.values.image'],
      },
    })
      .concat(getCourse.middleware)
      .concat(getCourseTrainee.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
