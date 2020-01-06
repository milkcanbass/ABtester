import { createSelector } from 'reselect';
import cardWindowReducer from './cardWindow.reducer';

const selectCardWindowReducer = (state) => state.cardWindow;

export const selectImageReady = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.imagesReady,
);

export const selectWindow1Image = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window1Image,
);

export const selectWindow2Image = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window2Image,
);

export const selectWindow1Url = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window1Url,
);

export const selectWindow2Url = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window2Url,
);

export const selectWindow1Progress = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window1Progress,
);

export const selectWindow2Progress = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window2Progress,
);
export const selectWindow1Uuid = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window1Uuid,
);

export const selectWindow2Uuid = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window2Uuid,
);
