import React, { useState } from 'react';
import './picturesSection.scss';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import uuidv4 from 'uuid/v4';
import {
  selectWindow1Image,
  selectWindow2Image,
} from '../../redux/pictureWindow/pictureWindow.selectors';

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
    progress: 0,
  });
  let previousUuid;
  let progression;

  const uploadImageUrl = (imageUrlArr) => db
    .collection('pages')
    .add({
      imageUrl1: imageUrlArr[0],
      imageUrl1Like: 0,
      imageUrl2: imageUrlArr[1],
      imageUrl2Like: 0,
    })
    .catch((err) => {
      alert(err);
    });

  // const progressBar = (imageToServer) => imageToServer.on('state_changed', (snapshot) => {
  //   (progression = (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
  //   setDisableBtn({ ...disableBtn, progress: progression });
  // });

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
        // progression function
        (progression = (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        setDisableBtn({ ...disableBtn, progress: progression });
        console.log(snapshot);
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
        setDisableBtn({ ...disableBtn, uploadSuccess: false });
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
      .then((result) => uploadImageUrl(result))
      .then((docRef) => console.log(docRef.id))
      .catch((err) => alert(err));
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
      <progress value={disableBtn.progress} max="100" />
      <div className="cardWrapper">
        <PictureWindow window="window1" />
        <PictureWindow window="window2" />
      </div>
      {uploadingBtn}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  window1Image: selectWindow1Image,
  window2Image: selectWindow2Image,
});

export default connect(mapStateToProps)(PicturesSection);
