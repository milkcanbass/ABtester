import React, { useState } from 'react';
import './picturesSection.scss';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import uuidv4 from 'uuid/v4';
import {
  selectWindow1Image,
  selectWindow2Image,
} from '../../redux/cardWindow/cardWindow.selectors';

// Components
import PictureWindow from '../pictureWindow/pirctureWindow';
import MyButton from '../myButton/myButton';

// firebase
import { storage, db } from '../../../firebase/firebaseConfig';

// util

const PicturesSection = ({ window1Image, window2Image }) => {
  const [disableBtn, setDisableBtn] = useState({
    disable: false,
    uploadSuccess: true,
    uploadTurn: 0,
  });
  let previousUuid;

  const uploadImage = (image) => {
    // For first upload failed
    if (!disableBtn.uploadSuccess) {
      setDisableBtn({ disable: false });
      return;
    }

    setDisableBtn.uploadTurn += 1;
    const uuid = Date.now() + uuidv4();
    const imageToServer = storage.ref(`images/${uuid}`).put(image);
    return imageToServer
      .then((snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      })
      .then(() => {
        previousUuid = uuid;
        return storage
          .ref('images')
          .child(uuid)
          .getDownloadURL();
      })
      .then((data) => data)
      .catch((err) => {
        // if 1st upload failed
        if (disableBtn.uploadSucces && disableBtn.uploadTurn === 1) {
          storage.ref(`images/${previousUuid}`).delete();
        }
        // set initial state
        setDisableBtn({ uploadSuccess: false });
        alert(err);
      });
  };

  const handleUpload = () => {
    if (!window1Image || !window2Image) {
      return alert('Please select images');
    }
    setDisableBtn({ disable: true, uploadSuccess: true, uploadTurn: 0 });
    previousUuid = undefined;
    Promise.all([uploadImage(window1Image), uploadImage(window2Image)])
      .then((result) => {
        db.collection('pages')
          .doc('test')
          .set({ result });
        console.log({ result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
