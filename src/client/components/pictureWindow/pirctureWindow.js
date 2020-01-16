import React, { Component } from 'react';
import './pirctureWindow.scss';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectWindow1ImgUrl,
  selectWindow2ImgUrl,
} from '../../redux/pictureWindow/pictureWindow.selectors';

import { setImage } from '../../redux/pictureWindow/pictureWindow.action';

// component
import MyButton from '../myButton/myButton';
import TextInput from '../textInput/textInput';

// fireStore
import firebase, { db } from '../../../firebase/firebaseConfig';

class PictureWindow extends Component {
  state = {
    liked: false,
    comment: '',
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      const { window, setImage } = this.props;

      const image = e.target.files[0];
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImage({
        window,
        image,
        imageUrl,
      });
    }
  };

  sendLike = () => {
    const { window } = this.props;
    const increment = firebase.firestore.FieldValue.increment(1);
    const docRef = this.props.pageRef;

    // Update read count. one time like per access
    if (!this.state.liked) {
      if (window === 'window1') {
        docRef.update({ imageUrl1Like: increment });
      } else {
        docRef.update({ imageUrl2Like: increment });
      }
      this.setState({
        liked: true,
      });
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

    // Update read count. one time like per access

    if (window === 'window1') {
      docRef.update({ imageUrl1Comments: addComment });
    } else {
      docRef.update({ imageUrl2Comments: addComment });
    }
  };

  render() {
    const {
      window, window1ImgUrl, window2ImgUrl, surveyPage, imageUrl1, imageUrl2
    } = this.props;
    const { liked } = this.state;
    let imageScreen;
    if (window === 'window1') {
      imageScreen = (
        <img
          src={surveyPage ? imageUrl1 : window1ImgUrl || 'http://via.placeholder.com/400x300'}
          alt="Uploaded images"
          height="300"
          width="400"
        />
      );
    } else {
      imageScreen = (
        <img
          src={surveyPage ? imageUrl2 : window2ImgUrl || 'http://via.placeholder.com/400x300'}
          alt="Uploaded images"
          height="300"
          width="400"
        />
      );
    }

    let infoSection;
    if (surveyPage) {
      infoSection = (
        <div className="textWrapper">
          <TextInput like value={this.state.comment} onChange={(e) => this.onChange(e)}>
            Like
          </TextInput>
          <MyButton onClick={(e) => this.submitComment(e)}>Submit</MyButton>
          <MyButton like onClick={liked ? null : () => this.sendLike(window)}>
            {liked ? 'Thank you for your like!' : 'like'}
          </MyButton>
        </div>
      );
    } else {
      infoSection = <input className="fileInput" type="file" onChange={this.handleChange} />;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureWindow);
