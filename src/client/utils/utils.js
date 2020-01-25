import store from '../redux/store';
import { setImage } from '../redux/pictureWindow/pictureWindow.action';

export const displayImage = (image, window) => {
  const fileSize = image.size / 1024 / 1024;

  if (fileSize > 4) {
    alert('Image size exceeds 4 MB');
  } else if (image) {
    // const { window, setImage } = this.props;
    const imageUrl = URL.createObjectURL(image);

    console.log(image, window, imageUrl);

    store.dispatch(
      setImage({
        window,
        image,
        imageUrl,
      }),
    );
  }
};
