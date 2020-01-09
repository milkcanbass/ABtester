import { SET_WINDOW1_IMAGE, SET_WINDOW2_IMAGE } from './pictureWindow.types';

export const setImage = (payload) => (dispatch) => {
  const { window, image, imageUrl } = payload;

  if (window === 'window1') {
    dispatch({ type: SET_WINDOW1_IMAGE, payload: { image, imageUrl } });
  } else {
    dispatch({ type: SET_WINDOW2_IMAGE, payload: { image, imageUrl } });
  }
};
