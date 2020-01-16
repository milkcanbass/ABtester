import React, { Component } from 'react';
import './survey.style.scss';

// firebase
import { db } from '../../../firebase/firebaseConfig';

// Component
import PictureWindow from '../../components/pictureWindow/pirctureWindow';
import CommentSection from '../../components/commentSection/commentSection';
import ProgressBar from '../../components/progressBar/progressBar';

class Survey extends Component {
  state = {
    imageUrl1: '',
    imageUrl1Like: 0,
    imageUrl1Comments: [],
    imageUrl2: '',
    imageUrl2Like: 0,
    imageUrl2Comments: [],
    title: '',
    address: '',
    pageRef: null,
  };

  componentDidMount() {
    const address = this.props.match.params.survey;
    const pageRef = db.collection('pages').doc(address);

    this.setState({
      ...this.state,
      address,
      pageRef,
    });

    pageRef.onSnapshot((doc) => {
      const {
        imageUrl1,
        imageUrl1Like,
        imageUrl1Comments,
        imageUrl2,
        imageUrl2Like,
        imageUrl2Comments,
        title,
      } = doc.data();
      if (!doc.exists) {
        console.log('no pages exists');
      } else {
        this.setState({
          imageUrl1,
          imageUrl1Like,
          imageUrl1Comments,
          imageUrl2,
          imageUrl2Like,
          imageUrl2Comments,
          title,
        });
      }
    });
  }

  render() {
    const {
      imageUrl1,
      imageUrl1Like,
      imageUrl1Comments,
      imageUrl2,
      imageUrl2Like,
      imageUrl2Comments,
      title,
      pageRef,
    } = this.state;

    return (
      <div className="surveyWrapper">
        <h1>{title}</h1>
        <ProgressBar />
        <div className="picWidRapper">
          <div className="win1Wrapper">
            <h1>{imageUrl1Like}</h1>
            <PictureWindow window="window1" surveyPage imageUrl1={imageUrl1} pageRef={pageRef} />
            <CommentSection comments={imageUrl1Comments} />

            {/* {imageUrl1Comments.map((comment) => (
              <h1>{comment.comment}</h1>
            ))} */}
          </div>
          <div className="win2Wrapper">
            <h1>{imageUrl2Like}</h1>
            <PictureWindow window="window2" surveyPage imageUrl2={imageUrl2} pageRef={pageRef} />
            {/* {imageUrl2Comments.map((comment) => (
              <h1>{comment.comment}</h1>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Survey;
