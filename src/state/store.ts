import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {store} from './manager'

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {store}