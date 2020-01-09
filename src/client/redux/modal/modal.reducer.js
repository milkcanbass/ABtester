import { MODAL_OPEN, MODAL_CLOSE } from './modal.types';

const INITIAL_STATE = {
  visible: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case MODAL_OPEN:
      return {
        visible: true,
      };
    case MODAL_CLOSE:
      return {
        visible: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
