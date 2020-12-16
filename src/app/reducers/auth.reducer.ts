import { createReducer, Action, REDUCER_FACTORY, on } from "@ngrx/store";
import * as actions from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  userName?: string;
  token?: string;
}

const initialState: AuthState = { isLoggedIn: false };

const reducerFunction = createReducer(
  initialState,
  on(actions.logout, actions.loginRequested, actions.loginRequested, () => initialState),
  on(actions.loginSucceeded, (state, action) => ({
    isLoggedIn: true,
    username: action.payload.username,
    token: action.payload.token
  }))
);

export function reducer(state: AuthState, action: Action): AuthState {
  return reducerFunction(state, action);
}
