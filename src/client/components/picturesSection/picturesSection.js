import React, { useState } from 'react';
import './picturesSection.scss';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import uuidv4 from 'uuid/v4';
import {
  selectPageUrl,
  selectWindow1Image,
  selectWindow2Image,
  selectProgress,
} from '../../redux/pictureWindow/pictureWindow.selectors';
import { setPageUrl, setProgress } from '../../redux/pictureWindow/pictureWindow.action';
import { modalOpen } from '../../redux/modal/modal.action';

// Components
import PictureWindow from '../pictureWindow/pirctureWindow';
import MyButton from '../myButton/myButton';
import MyModal from '../myModal/myModal';
import TextInput from '../textInput/textInput';

// firebase
import { storage, db, uploadImageUrl } from '../../../firebase/firebaseConfig';

const PicturesSection = ({
  window1Image,
  window2Image,
  modalOpen,
  setPageUrl,
  pageUrl,
  setProgress,
}) => {
  const [disableBtn, setDisableBtn] = useState({
    disable: false,
    uploadSuccess: true,
    uploadTurn: 0,
    title: '',
  });
  let previousUuid;

  const onChange = (e) => {
    setDisableBtn({
      ...disableBtn,
      title: e.target.value,
    });
  };

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
      .then(() => {
        previousUuid = uuid;
        return storage
          .ref('images')
          .child(uuid)
          .getDownloadURL();
      })
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

  const handleUpload = async () => {
    setDisableBtn({ disable: true, uploadSuccess: true, uploadTurn: 0 });
    let result;
    const imageUrlArr = [];
    for (let i = 0; i < 2; i++) {
      const image = i === 0 ? window1Image : window2Image;
      result = await uploadImage(image);
      await imageUrlArr.push(result);
    }
    const url = await uploadImageUrl(imageUrlArr, disableBtn.title);
    await setPageUrl(url.id);
    await console.log(url);
    await modalOpen();
    await setDisableBtn({ disable: false, uploadSuccess: true, uploadTurn: 0 });

    // if (!window1Image || !window2Image) {
    //   return alert('Please select images');
    // }
    // setDisableBtn({ disable: true, uploadSuccess: true, uploadTurn: 0 });
    // previousUuid = undefined;
    // // handling uploadImage and get pageUrl
    // Promise.all([uploadImage(window1Image), uploadImage(window2Image)])
    //   .then((result) => uploadImageUrl(result, disableBtn.title))
    //   .then((docRef) => {
    //     const url = docRef.id;
    //     setPageUrl(url);
    //   })
    //   .then(() => modalOpen())
    //   .then(() => setDisableBtn({
    //     disable: false,
    //     uploadSuccess: true,
    //     uploadTurn: 0,
    //     title: '',
    //   }),)
    //   .catch((err) => alert(err));
  };

  let btnMes;
  if (window1Image && window2Image) {
    btnMes = 'UPLOAD';
  } else {
    btnMes = 'PLEASE SELECT IMAGES';
  }

  return (
    <>
      <MyModal pageUrl={pageUrl} />
      <div className="pageWrapper">
        <div className="pageWrapperBg" />
        <h3>Upload images.(max size 1MB)</h3>
        <div className="cardWrapper">
          <PictureWindow window="window1" />
          <PictureWindow window="window2" />
        </div>
        <div className="inputSectionWrapper">
          <TextInput
            placeholder="What's your question?"
            name="title"
            value={disableBtn.title}
            onChange={(e) => onChange(e)}
            maxlength="50"
          />
          <MyButton onClick={(e) => handleUpload()} disabled={disableBtn.disable}>
            {btnMes}
          </MyButton>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  window1Image: selectWindow1Image,
  window2Image: selectWindow2Image,
  pageUrl: selectPageUrl,
  progress: selectProgress,
});

const mapDispatchToState = (dispatch) => ({
  modalOpen: () => dispatch(modalOpen()),
  setPageUrl: (url) => dispatch(setPageUrl(url)),
  setProgress: (num) => dispatch(setProgress(num)),
});

export default connect(mapStateToProps, mapDispatchToState)(PicturesSection);
