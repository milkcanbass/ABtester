import React from 'react';
import './picturesSection.scss';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectImageReady } from '../../redux/cardWindow/cardWindow.selectors';
import { setImageReady } from '../../redux/cardWindow/cardWindow.action';

// Components
import PictureWindow from '../pictureWindow/pirctureWindow';
import MyButton from '../myButton/myButton';

const PicturesSection = ({ setImageReady, imageReady }) => (
  <>
    <div className="cardWrapper">
      <PictureWindow window="window1" />
      <PictureWindow window="window2" />
    </div>
    <MyButton ready="ready" onClick={(e) => setImageReady()}>
      {imageReady ? 'upload' : 'uploade image'}
    </MyButton>
  </>
);

const mapDispatchToProps = (dispatch) => ({
  setImageReady: () => dispatch(setImageReady()),
});

const mapStateToProps = createStructuredSelector({
  imageReady: selectImageReady,
});

export default connect(mapStateToProps, mapDispatchToProps)(PicturesSection);
