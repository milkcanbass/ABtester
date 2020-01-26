import React, { Component } from 'react';
import './pirctureWindow.scss';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectWindow1ImgUrl,
  selectWindow2ImgUrl,
  selectWindow1Image,
  selectWindow2Image,
  selectLikedState,
} from '../../redux/pictureWindow/pictureWindow.selectors';

import { setImage, setLiked } from '../../redux/pictureWindow/pictureWindow.action';

// import functions
import { displayImage } from '../../utils/utils';
import { sendLike, uploadComment } from '../../../firebase/firebaseConfig';

// component
import MyButton from '../myButton/myButton';
import TextInput from '../textInput/textInput';
import LikeIcon from '../likeIcon/likeIcon';

// fireStore

class PictureWindow extends Component {
  state = {
    comment: '',
    comDisable: false,
    like1: 0,
    like2: 0,
  };

  handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const { window } = this.props;
    displayImage(file, window);
  };

  // allow user to select same file
  inputOnClick = (e) => {
    e.target.value = null;
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      comment: e.target.value,
    });
  };

  likeIconClick = () => {
    const {
      likedState, pageRef, window, setLiked
    } = this.props;

    if (likedState) {
      return null;
    }
    sendLike(pageRef, window);
    setLiked();
  };

  submitComment = async (e) => {
    e.preventDefault();
    const { window, pageRef } = this.props;
    const { comment } = this.state;
    await uploadComment(pageRef, comment, window);
    await this.setState({ ...this.state, comDisable: true });
    await this.setState({ ...this.state, comDisable: false, comment: '' });
  };

  render() {
    const {
      window,
      window1ImgUrl,
      window2ImgUrl,
      surveyPage,
      imageUrl1,
      imageUrl2,
      imageUrl1Like,
      imageUrl2Like,
      like1Percentage,
      like2Percentage,
    } = this.props;

    let imageScreen;
    if (window === 'window1') {
      imageScreen = (
        <div className={surveyPage ? 'imgWrap' : 'topImgWrap'}>
          <img
            src={surveyPage ? imageUrl1 : window1ImgUrl || 'http://via.placeholder.com/400x300'}
            alt="Uploaded images"
            className="imageScreen"
          />
        </div>
      );
    } else {
      imageScreen = (
        <div className={surveyPage ? 'imgWrap' : 'topImgWrap'}>
          <img
            src={surveyPage ? imageUrl2 : window2ImgUrl || 'http://via.placeholder.com/400x300'}
            alt="Uploaded images"
            className="imageScreen"
          />
        </div>
      );
    }

    // let totalLike =

    let infoSection;
    if (surveyPage) {
      infoSection = (
        <div className="textWrapper">
          <div className="likeSection">
            <div className="percentage">
              {window === 'window1' ? `${like1Percentage}%` : `${like2Percentage}%`}
            </div>
            <LikeIcon
              like
              onClick={() => this.likeIconClick()}
              window={window}
              imageUrl1Like={imageUrl1Like}
              imageUrl2Like={imageUrl2Like}
            />
          </div>
          <TextInput
            placeholder="COMMENT"
            value={this.state.comment}
            onChange={(e) => this.onChange(e)}
          />
          <MyButton onClick={(e) => this.submitComment(e)}>Submit</MyButton>
        </div>
      );
    } else {
      infoSection = (
        <label className="custom-file-upload">
          <input
            className="fileInput"
            type="file"
            accept="image/*"
            onClick={(e) => this.inputOnClick(e)}
            onChange={this.handleChange}
          />
          <p>UPLOAD</p>
        </label>
      );
    }

    return (
      <div className="picWidWrapper">
        {imageScreen}
        {infoSection}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setImage: (window, image, imageUrl) => dispatch(setImage(window, image, imageUrl)),
  setLiked: () => dispatch(setLiked()),
});

const mapStateToProps = createStructuredSelector({
  window1ImgUrl: selectWindow1ImgUrl,
  window2ImgUrl: selectWindow2ImgUrl,
  window1Img: selectWindow1Image,
  window2Img: selectWindow2Image,
  likedState: selectLikedState,
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureWindow);
