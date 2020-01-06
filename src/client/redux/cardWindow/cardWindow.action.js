import { IMAGES_READY } from './cardWindow.types';

export const setImageReady = (payload) => (dispatch) => {
  dispatch({ type: IMAGES_READY, payload });
};
