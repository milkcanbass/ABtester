import {
  SET_WINDOW1_IMAGE,
  SET_WINDOW2_IMAGE,
  SET_PAGEURL,
  REMOVE_PAGEURL,
  SET_PROGRESS,
  LIKED_STATE,
} from './pictureWindow.types';

const INITIAL_STATE = {
  pageUrl: '',
  window1Image: null,
  window1ImgUrl: '',
  progress: 0,
  window2Image: null,
  window2ImgUrl: '',
  likedState: false,
};

const pictureWindowReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WINDOW1_IMAGE:
      return {
        ...state,
        window1Image: payload.image,
        window1ImgUrl: payload.imageUrl,
      };
    case SET_WINDOW2_IMAGE:
      return {
        ...state,
        window2Image: payload.image,
        window2ImgUrl: payload.imageUrl,
      };
    case SET_PAGEURL:
      return { ...state, pageUrl: payload };
    case SET_PROGRESS:
      return { ...state, progress: payload };
    case SET_PROGRESS:
      return { ...state, progress: true };
    case REMOVE_PAGEURL:
      return {
        pageUrl: '',
        window1Image: null,
        window1ImgUrl: '',
        progress: 0,
        window2Image: null,
        window2ImgUrl: '',
      };
    default:
      return state;
  }
};

export default pictureWindowReducer;
