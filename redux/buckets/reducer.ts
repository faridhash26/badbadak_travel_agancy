import { REDUX_ACTION } from "../../enum/redux-action.enum";
import { ReduxStoreModel } from "../../model/redux/redux-store-model";
import { BucketsAction } from "./action.model";

export function reducer(
  prevState: ReduxStoreModel["buckets"],
  action: BucketsAction
): ReduxStoreModel["buckets"] {
  switch (action.type) {
    case REDUX_ACTION.ADD_BUCKET:
      const index = prevState.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        return [...prevState, action.payload];
      } else {
        return prevState;
      }

    default:
      return prevState ? prevState : [];
  }
}
