import { IMAGES_READY, SET_WINDOW1_IMAGE, SET_WINDOW2_IMAGE } from './cardWindow.types';

export const setImageReady = (payload) => (dispatch) => {
  dispatch({ type: IMAGES_READY, payload });
};

export const setImage = (payload) => (dispatch) => {
  const {
    window, image, uuid, imageUrl
  } = payload;
  console.log(imageUrl);

  if (window === 'window1') {
    dispatch({ type: SET_WINDOW1_IMAGE, payload: { image, uuid, imageUrl } });
  } else {
    dispatch({ type: SET_WINDOW2_IMAGE, payload: { image, uuid, imageUrl } });
  }
};
