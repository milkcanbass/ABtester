import {
  SET_WINDOW1_IMAGE,
  SET_WINDOW2_IMAGE,
  SET_PAGEURL,
  REMOVE_PAGEURL,
  SET_PROGRESS,
  LIKED_STATE,
} from './pictureWindow.types';

export const setImage = (payload) => (dispatch) => {
  const { window, image, imageUrl } = payload;
  console.log(payload);

  if (window === 'window1') {
    dispatch({ type: SET_WINDOW1_IMAGE, payload: { image, imageUrl } });
  } else {
    dispatch({ type: SET_WINDOW2_IMAGE, payload: { image, imageUrl } });
  }
};

export const setPageUrl = (payload) => (dispatch) => {
  dispatch({ type: SET_PAGEURL, payload });
};

export const removePageUrl = (payload) => (dispatch) => {
  dispatch({ type: REMOVE_PAGEURL });
};

export const setProgress = (payload) => (dispatch) => {
  dispatch({ type: SET_PROGRESS, payload });
};

export const setLiked = (payload) => (dispatch) => {
  dispatch({ type: LIKED_STATE, payload });
};
