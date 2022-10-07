import { Action } from "redux";
import { REDUX_ACTION } from "../../enum/redux-action.enum";
import { ResortEntityConfig } from "../../model/redux/resort-model";

export interface BucketsAction extends Action<REDUX_ACTION> {
  payload: ResortEntityConfig;
}
