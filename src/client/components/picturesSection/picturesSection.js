import React, { useState } from 'react';
import './picturesSection.scss';
// import 'babel-polyfill'; // for regenerator runtime

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectPageUrl,
  selectWindow1Image,
  selectWindow2Image,
  selectImage1Id,
  selectImage2Id,
} from '../../redux/pictureWindow/pictureWindow.selectors';
import { setPageUrl, setImageId } from '../../redux/pictureWindow/pictureWindow.action';
import { modalOpen } from '../../redux/modal/modal.action';

// Components
import PictureWindow from '../pictureWindow/pirctureWindow';
import MyButton from '../myButton/myButton';
import MyModal from '../myModal/myModal';
import TextInput from '../textInput/textInput';

// firebase
import {
  storage,
  db,
  deleteImage,
  uploadImageUrl,
  uploadImage,
} from '../../../firebase/firebaseConfig';

const PicturesSection = ({
  window1Image,
  window2Image,
  modalOpen,
  setPageUrl,
  pageUrl,
  setImageId,
  image1Id,
  image2Id,
}) => {
  const [picSectionState, setPicSectionState] = useState({
    disable: false,
    title: '',
  });
  const onChange = (e) => {
    setPicSectionState({
      ...picSectionState,
      title: e.target.value,
    });
  };

  const handleUpload = async () => {
    // const { image1Id, image2Id } = picSectionState;
    setPicSectionState({ disable: true });
    let result;
    const imageUrlArr = [];

    // Loop throw images to upload and get image address
    for (let i = 0; i < 2; i++) {
      const image = i === 0 ? window1Image : window2Image;
      result = await uploadImage(image, i);
      await imageUrlArr.push(result);
    }

    // for the case uploade failed. delete images and not create page
    if (image1Id !== null && image2Id !== null) {
      await deleteImage(image1Id);
      await deleteImage(image2Id);
      await alert('error: Uploading image1 and image2 unsucceeded');
    } else if (image1Id !== null) {
      await deleteImage(image1Id);
      await alert('error: Uploading image1 unsucceeded');
    } else if (image2Id !== null) {
      await deleteImage(image2Id);
      await alert('error: Uploading image2 unsucceeded');
    } else {
      // All green. create a page
      const url = await uploadImageUrl(imageUrlArr, picSectionState.title);
      await setPageUrl(url.id);
      await modalOpen();
    }
    await setPicSectionState({
      disable: false,
      title: '',
    });
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
        <h3>Upload images.(max size 4MB)</h3>
        <div className="cardWrapper">
          <PictureWindow window="window1" />
          <PictureWindow window="window2" />
        </div>
        <div className="inputSectionWrapper">
          <TextInput
            placeholder="What's your question?"
            name="title"
            value={picSectionState.title}
            onChange={(e) => onChange(e)}
            maxlength="50"
          />
          <MyButton onClick={(e) => handleUpload()} disabled={picSectionState.disable}>
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
  image1Id: selectImage1Id,
  image2Id: selectImage2Id,
});

const mapDispatchToState = (dispatch) => ({
  modalOpen: () => dispatch(modalOpen()),
  setPageUrl: (url) => dispatch(setPageUrl(url)),
  setImageId: (uuid, image) => dispatch(setImageId(uuid, image)),
});

export default connect(mapStateToProps, mapDispatchToState)(PicturesSection);
