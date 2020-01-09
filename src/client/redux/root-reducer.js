import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import pictureWindowReducer from './pictureWindow/pictureWindow.reducer';
import modalReducer from './modal/modal.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  pictureWindow: pictureWindowReducer,
  modal: modalReducer,
});

export default rootReducer;
