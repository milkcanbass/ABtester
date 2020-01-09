import { MODAL_OPEN, MODAL_CLOSE } from './modal.types';

export const modalOpen = (payload) => (dispatch) => {
  dispatch({ type: MODAL_OPEN, payload });
};

export const modalClose = (payload) => (dispatch) => {
  dispatch({ type: MODAL_CLOSE, payload });
};
