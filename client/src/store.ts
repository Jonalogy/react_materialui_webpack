import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { firebaseReducerTyped } from 'firebase/slice';
import discoveryReducer from "app/domains/discovery/discoverySlice"
import moderationReducer from "app/domains/moderation/moderationSlice"
import { constants } from "react-redux-firebase"
// import { fireStoreReducerTyped } from 'fire/store';

export const store = configureStore({
  reducer: {
    discovery: discoveryReducer,
    moderation: moderationReducer,
    firebase: firebaseReducerTyped
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [constants.actionTypes.LOGIN]
    }
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
