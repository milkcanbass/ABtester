import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cardWindowReducer from './cardWindow/cardWindow.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  cardWindow: cardWindowReducer,
});

export default rootReducer;
