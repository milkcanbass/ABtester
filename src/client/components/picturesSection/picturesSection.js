import React, { useState } from 'react';
import './picturesSection.scss';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectWindow1Image,
  selectWindow2Image,
} from '../../redux/cardWindow/cardWindow.selectors';

// Components
import PictureWindow from '../pictureWindow/pirctureWindow';
import MyButton from '../myButton/myButton';

const PicturesSection = ({ window1Image, window2Image }) => {
  const [disableBtn, setDisableBtn] = useState({
    disable: false,
  });

  const handleUpload = () => {
    if (!window1Image || !window2Image) {
      return alert('Please select images');
    }
    setDisableBtn({
      disable: true,
    });
    const uploadTask = storage.ref(`images/${uuid}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
        setDisableBtn({
          disable: false,
        });
      },
      () => {
        // complete function ....
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url });
          });
      },
    );
  };

  //

  let uploadingBtn;
  if (window1Image && window2Image) {
    uploadingBtn = (
      <MyButton onClick={(e) => handleUpload()} disabled={disableBtn.disable}>
        Push to upload
      </MyButton>
    );
  } else {
    uploadingBtn = <MyButton onClick={(e) => handleUpload()}>Please choose image</MyButton>;
  }

  return (
    <>
      <div className="cardWrapper">
        <PictureWindow window="window1" />
        <PictureWindow window="window2" />
      </div>
      {uploadingBtn}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setImageReady: () => dispatch(setImageReady()),
});

const mapStateToProps = createStructuredSelector({
  window1Image: selectWindow1Image,
  window2Image: selectWindow2Image,
});

export default connect(mapStateToProps, mapDispatchToProps)(PicturesSection);
