import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import courseReducer from '../features/course/courseSlice';
import lessonModalsReducer from '../features/course/lessonModalsSlice';
import stepperReducer from '../features/stepper/stepperSlice';
import { lessonApi } from '@/services/lessonApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseReducer,
    lessonModals: lessonModalsReducer,
    stepper: stepperReducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['course/updateForm'],
        ignoredActionPaths: ['payload.image'],
        ignoredPaths: ['course.values.image'],
      },
    }).concat(lessonApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
