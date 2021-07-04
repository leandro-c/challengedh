import { configureStore } from '@reduxjs/toolkit';
import answerReducer from '../features/answerform/answerSlice';

export const store = configureStore({
  reducer: {
    answers: answerReducer,
  },
});
