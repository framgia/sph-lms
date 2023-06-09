import { getCategory } from '@/services/categoryAPI';
import { getCourse } from '@/services/courseAPI';
import { getLearningPath } from '@/services/learningPathAPI';
import { getCourseTrainee } from '@/services/traineeAPI';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import courseReducer from '../features/course/courseSlice';
import lessonModalsReducer from '../features/course/lessonModalsSlice';
import courseModalsReducer from '../features/learning-path/courseModalsSlice';
import learningPathReducer from '../features/learning-path/learningPathSlice';
import stepperReducer from '../features/stepper/stepperSlice';
import tabReducer from '../features/tab/tabSlice';
import courseLearnerReducer from '../features/course/learnerSlice';
import learningPathLearnerReducer from '../features/learning-path/learnerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseReducer,
    courseLearner: courseLearnerReducer,
    learningPathLearner: learningPathLearnerReducer,
    lessonModals: lessonModalsReducer,
    learningPath: learningPathReducer,
    courseModals: courseModalsReducer,
    stepper: stepperReducer,
    tab: tabReducer,
    [getCourse.reducerPath]: getCourse.reducer,
    [getCourseTrainee.reducerPath]: getCourseTrainee.reducer,
    [getCategory.reducerPath]: getCategory.reducer,
    [getLearningPath.reducerPath]: getLearningPath.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(getCourse.middleware)
      .concat(getCourseTrainee.middleware)
      .concat(getCategory.middleware)
      .concat(getLearningPath.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
