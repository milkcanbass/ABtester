import {
  SET_WINDOW1_IMAGE,
  SET_WINDOW2_IMAGE,
  SET_PAGEURL,
  REMOVE_PAGEURL,
} from './pictureWindow.types';

const INITIAL_STATE = {
  pageUrl: '',
  window1Image: null,
  window1ImgUrl: '',
  window1Progress: 0,
  window2Image: null,
  window2ImgUrl: '',
  window2Progress: 0,
};

const pictureWindowReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WINDOW1_IMAGE:
      return {
        ...state,
        window1Image: payload.image,
        window1ImgUrl: payload.imageUrl,
        window1Progress: 0,
      };
    case SET_WINDOW2_IMAGE:
      return {
        ...state,
        window2Image: payload.image,
        window2ImgUrl: payload.imageUrl,
        window2Progress: 0,
      };
    case SET_PAGEURL:
      return { ...state, pageUrl: payload };
    case REMOVE_PAGEURL:
      return {
        pageUrl: '',
        window1Image: null,
        window1ImgUrl: '',
        window1Progress: 0,
        window2Image: null,
        window2ImgUrl: '',
        window2Progress: 0,
      };
    default:
      return state;
  }
};

export default pictureWindowReducer;
