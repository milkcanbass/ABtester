import { createSelector } from 'reselect';

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

export const selectWindow1ImgUrl = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window1ImgUrl,
);

export const selectWindow2ImgUrl = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window2ImgUrl,
);

export const selectWindow1Progress = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window1Progress,
);

export const selectWindow2Progress = createSelector(
  [selectCardWindowReducer],
  (cardWindow) => cardWindow.window2Progress,
);
