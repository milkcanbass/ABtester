import { IMAGES_READY, SET_WINDOW1_IMAGE, SET_WINDOW2_IMAGE } from './cardWindow.types';

const INITIAL_STATE = {
  window1Image: null,
  window1Url: '',
  window1ImgUrl: '',
  window1Progress: 0,
  window1Uuid: '',
  window2Image: null,
  window2Url: '',
  window2ImgUrl: '',
  window2Progress: 0,
  window2Uuid: '',
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
        window1Url: '',
        window1ImgUrl: payload.imageUrl,
        window1Progress: 0,
        window1Uuid: payload.uuid,
      };
    case SET_WINDOW2_IMAGE:
      return {
        ...state,
        window2Image: payload.image,
        window2Url: '',
        window2ImgUrl: payload.imageUrl,
        window2Progress: 0,
        window2Uuid: payload.uuid,
      };
    default:
      return state;
  }
};

export default cardWindowReducer;
