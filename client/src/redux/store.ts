import { getCategory } from '@/src/services/categoryAPI';
import { getCourse } from '@/src/services/courseAPI';
import { getLearningPath } from '@/src/services/learningPathAPI';
import { getCourseTrainee } from '@/src/services/traineeAPI';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from '../features/counter/counterSlice';
import courseReducer from '../features/course/courseSlice';
import courseLearnerReducer from '../features/course/learnerSlice';
import lessonModalsReducer from '../features/course/lessonModalsSlice';
import courseModalsReducer from '../features/learning-path/courseModalsSlice';
import learningPathLearnerReducer from '../features/learning-path/learnerSlice';
import learningPathReducer from '../features/learning-path/learningPathSlice';
import stepperReducer from '../features/stepper/stepperSlice';
import tabReducer from '../features/tab/tabSlice';
import trainerCourseReducer from '../features/trainer/trainerCourseSlice';
import { getTrainer } from '../services/trainerAPI';
import dashboardTraineeReducer from '../features/trainer/dashboard/traineeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    course: courseReducer,
    courseLearner: courseLearnerReducer,
    learningPathLearner: learningPathLearnerReducer,
    trainerCourse: trainerCourseReducer,
    lessonModals: lessonModalsReducer,
    learningPath: learningPathReducer,
    courseModals: courseModalsReducer,
    stepper: stepperReducer,
    tab: tabReducer,
    trainerDashboard: dashboardTraineeReducer,
    [getCourse.reducerPath]: getCourse.reducer,
    [getCourseTrainee.reducerPath]: getCourseTrainee.reducer,
    [getCategory.reducerPath]: getCategory.reducer,
    [getLearningPath.reducerPath]: getLearningPath.reducer,
    [getTrainer.reducerPath]: getTrainer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(getCourse.middleware)
      .concat(getCourseTrainee.middleware)
      .concat(getCategory.middleware)
      .concat(getLearningPath.middleware)
      .concat(getTrainer.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
