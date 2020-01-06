import { SET_USER_LOGIN } from './user.types';

export const setUserLogin = (payload) => (dispatch) => {
  dispatch({ type: SET_USER_LOGIN, payload });
};
