import { AnyAction, combineReducers, Reducer, ReducersMapObject } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

import { ReduxStoreModel } from "../model/redux/redux-store-model";
import { reducer as BucketReducer } from "./buckets/reducer";

const reducers: ReducersMapObject<ReduxStoreModel, AnyAction> = {
  buckets: BucketReducer as Reducer<ReduxStoreModel["buckets"], AnyAction>,
};

const combinedReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== "production",
});
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
