import { IMAGES_READY, SET_WINDOW1_IMAGE, SET_WINDOW2_IMAGE } from './cardWindow.types';

const INITIAL_STATE = {
  window1Image: null,
  window1ImgUrl: '',
  window1Progress: 0,
  window2Image: null,
  window2ImgUrl: '',
  window2Progress: 0,
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
    case SET_WINDOW1_IMAGE:
      console.log('reducer', payload);
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
    default:
      return state;
  }
};

export default cardWindowReducer;
