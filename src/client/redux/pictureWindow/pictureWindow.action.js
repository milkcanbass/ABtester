import {
  SET_WINDOW1_IMAGE,
  SET_WINDOW2_IMAGE,
  SET_PAGEURL,
  REMOVE_PAGEURL,
  LIKED_STATE,
  SET_IMAGE1_ID,
  SET_IMAGE2_ID,
} from './pictureWindow.types';

export const setImage = (payload) => (dispatch) => {
  const { window, image, imageUrl } = payload;

  if (window === 'window1') {
    dispatch({ type: SET_WINDOW1_IMAGE, payload: { image, imageUrl } });
  } else {
    dispatch({ type: SET_WINDOW2_IMAGE, payload: { image, imageUrl } });
  }
};

export const setPageUrl = (payload) => (dispatch) => {
  console.log(payload);
  dispatch({ type: SET_PAGEURL, payload });
};

export const removePageUrl = (payload) => (dispatch) => {
  dispatch({ type: REMOVE_PAGEURL });
};

export const setLiked = (payload) => (dispatch) => {
  dispatch({ type: LIKED_STATE, payload });
};

export const setImageId = (uuid, image) => (dispatch) => {
  if (image === 'image1') {
    dispatch({ type: SET_IMAGE1_ID, payload: uuid });
  } else {
    dispatch({ type: SET_IMAGE2_ID, payload: uuid });
  }
};
