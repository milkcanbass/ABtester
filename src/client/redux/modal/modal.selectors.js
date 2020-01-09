import { createSelector } from 'reselect';

const selectModalReducer = (state) => state.modal;

export const selectModalVisible = createSelector([selectModalReducer], (modal) => modal.visible);
