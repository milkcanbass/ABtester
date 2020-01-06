import { createSelector } from 'reselect';

const selectCardWindowReducer = (state) => state.cardWindow;

export const selectImageReady = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.imagesReady,
);
