import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

import { ReduxStoreModel } from "../model/redux/redux-store-model";
import { reducer as BucketReducer } from "./buckets/reducer";

const reducers: ReducersMapObject<ReduxStoreModel, AnyAction> = {
  buckets: BucketReducer as Reducer<ReduxStoreModel["buckets"], AnyAction>,
};

const combinedReducers = combineReducers(reducers);

const initialState = {
  buckets: [],
};
export const store = configureStore({
  reducer: combinedReducers,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== "production",
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
