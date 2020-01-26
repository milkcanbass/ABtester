import {
  SET_WINDOW1_IMAGE,
  SET_WINDOW2_IMAGE,
  SET_PAGEURL,
  REMOVE_PAGEURL,
  LIKED_STATE,
  SET_IMAGE1_ID,
  SET_IMAGE2_ID,
} from './pictureWindow.types';

const INITIAL_STATE = {
  pageUrl: '',
  window1Image: null,
  window1ImgUrl: '',
  image1Id: null,
  window2Image: null,
  window2ImgUrl: '',
  image2Id: null,
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
    case LIKED_STATE:
      return { ...state, likedState: true };
    case SET_IMAGE1_ID:
      return { ...state, image1Id: payload };
    case SET_IMAGE2_ID:
      return { ...state, image2Id: payload };
    case REMOVE_PAGEURL:
      return {
        pageUrl: '',
        window1Image: null,
        window1ImgUrl: '',
        image1Id: null,
        window2Image: null,
        window2ImgUrl: '',
        image2Id: null,
        likedState: false,
      };
    default:
      return state;
  }
};

export default pictureWindowReducer;
