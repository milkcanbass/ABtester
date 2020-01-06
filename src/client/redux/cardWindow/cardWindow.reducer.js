import { IMAGES_READY } from './cardWindow.types';

const INITIAL_STATE = {
  imagesReady: false,
};

const cardWindowReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case IMAGES_READY:
      return {
        ...state,
        imagesReady: true,
      };
    default:
      return state;
  }
};

export default cardWindowReducer;
