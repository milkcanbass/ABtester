import { createSelector } from 'reselect';

const selectPictureWindowReducer = (state) => state.pictureWindow;

export const selectPageUrl = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.pageUrl,
);

export const selectWindow1Image = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.window1Image,
);

export const selectWindow2Image = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.window2Image,
);

export const selectWindow1ImgUrl = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.window1ImgUrl,
);

export const selectWindow2ImgUrl = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.window2ImgUrl,
);

export const selectWindow1Progress = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.window1Progress,
);

export const selectWindow2Progress = createSelector(
  [selectPictureWindowReducer],
  (pictureWindow) => pictureWindow.window2Progress,
);
