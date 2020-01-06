import { SET_USER_LOGIN } from './user.types';

const INITIAL_STATE = {
  userId: 'userId',
  userName: 'sample',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_LOGIN:
      return {
        ...state,
        userId: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
