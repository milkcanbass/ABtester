import { MODAL_OPEN, MODAL_CLOSE } from './modal.types';
import { REMOVE_PAGEURL } from '../pictureWindow/pictureWindow.types';

export const modalOpen = (payload) => (dispatch) => {
  dispatch({ type: MODAL_OPEN, payload });
};

export const modalClose = (payload) => (dispatch) => {
  dispatch({ type: MODAL_CLOSE, payload });
  dispatch({ type: REMOVE_PAGEURL });
};
