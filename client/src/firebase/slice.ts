import { AnyAction, Reducer } from '@reduxjs/toolkit';
import { FirebaseReducer, firebaseReducer } from 'react-redux-firebase';
import { RootState } from 'store';

export interface IProfile {
    name: string
    email: string
}

// TODO
export interface ISchema { }

export const firebaseReducerTyped = firebaseReducer as Reducer<FirebaseReducer.Reducer<IProfile, ISchema>, AnyAction>
export const selectFirebaseAuth = (state: RootState) => state.firebase.auth
