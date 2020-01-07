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

//firebase
import { storage } from '../../../firebase/firebaseConfig';

const PicturesSection = ({ window1Image, window2Image, window1Uuid, window2Uuid }) => {
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
    const uploadImg1 = storage.ref(`images/${window1Uuid}`).put(window1Image);
    const uploadImg2 = storage.ref(`images/${window2Uuid}`).put(window2Image);
    uploadImg1.on(
      'state_changed',
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // this.setState({ progress });
      },
      error => {
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
          .child(window1Uuid)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            // this.setState({ url });
          });
        setDisableBtn({
          disable: false,
        });
      },
    );
  };

  //

  let uploadingBtn;
  if (window1Image && window2Image) {
    uploadingBtn = (
      <MyButton onClick={e => handleUpload()} disabled={disableBtn.disable}>
        Push to upload
      </MyButton>
    );
  } else {
    uploadingBtn = <MyButton onClick={e => handleUpload()}>Please choose image</MyButton>;
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

const mapDispatchToProps = dispatch => ({
  setImageReady: () => dispatch(setImageReady()),
});

const mapStateToProps = createStructuredSelector({
  window1Image: selectWindow1Image,
  window2Image: selectWindow2Image,
  window1Uuid: selectWindow1Uuid,
  window2Uuid: selectWindow2Uuid,
});

export default connect(mapStateToProps, mapDispatchToProps)(PicturesSection);
