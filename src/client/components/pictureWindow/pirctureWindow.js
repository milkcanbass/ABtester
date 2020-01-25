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

import { setImage } from '../../redux/pictureWindow/pictureWindow.action';

// import functions
import { displayImage } from '../../utils/utils';

// component
import MyButton from '../myButton/myButton';
import TextInput from '../textInput/textInput';
import LikeIcon from '../likeIcon/likeIcon';

// fireStore
import firebase, { db } from '../../../firebase/firebaseConfig';

class PictureWindow extends Component {
  state = {
    comment: '',
    like1: 0,
    like2: 0,
  };

  handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const { window } = this.props;
    displayImage(file, window);
  };

  inputOnClick = (e) => {
    e.target.value = null;
  };

  sendLike = () => {
    const { window, likedState } = this.props;
    const increment = firebase.firestore.FieldValue.increment(1);
    const docRef = this.props.pageRef;

    // Update read count. one time like per access
    if (!likedState) {
      if (window === 'window1') {
        docRef.update({ imageUrl1Like: increment });
      } else {
        docRef.update({ imageUrl2Like: increment });
      }
    } else {
      return null;
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      comment: e.target.value,
    });
  };

  submitComment = (e) => {
    e.preventDefault();
    const { window } = this.props;
    const { comment } = this.state;
    const time = new Date().getTime();

    const addComment = firebase.firestore.FieldValue.arrayUnion({ comment, time });
    const docRef = this.props.pageRef;

    // Check if comment is empty
    if (comment.replace(/\s/g, '') === '') {
      return null;
    }
    // Update read count. one time like per access
    if (window === 'window1') {
      docRef.update({ imageUrl1Comments: addComment });
    } else {
      docRef.update({ imageUrl2Comments: addComment });
    }
    this.setState({ ...this.state, comment: '' });
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
      likedState,
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
              onClick={likedState ? null : () => this.sendLike(window)}
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
});

const mapStateToProps = createStructuredSelector({
  window1ImgUrl: selectWindow1ImgUrl,
  window2ImgUrl: selectWindow2ImgUrl,
  window1Img: selectWindow1Image,
  window2Img: selectWindow2Image,
  likedState: selectLikedState,
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureWindow);
