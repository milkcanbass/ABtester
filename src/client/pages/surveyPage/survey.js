import React, { Component } from 'react';
import './survey.style.scss';

// firebase
import { db } from '../../../firebase/firebaseConfig';

// Component
import PictureWindow from '../../components/pictureWindow/pirctureWindow';
import CommentSection from '../../components/commentSection/commentSection';

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

    // background color
    const talLike = imageUrl1Like + imageUrl2Like;
    const like2Percentage = (imageUrl2Like / talLike) * 100;

    return (
      <div className="surveyWrapper">
        {/* <div className="surveyBackground" style={{ height: '100vh', width: '50vw' }} /> */}
        <h1>{title}</h1>
        <div className="picWidRapper">
          <div className="win1Wrapper">
            <h1>{imageUrl1Like}</h1>
            <PictureWindow window="window1" surveyPage imageUrl1={imageUrl1} pageRef={pageRef} />
            <CommentSection window="window1" comments={imageUrl1Comments} />
          </div>
          <div className="win2Wrapper">
            <h1>{imageUrl2Like}</h1>
            <PictureWindow window="window2" surveyPage imageUrl2={imageUrl2} pageRef={pageRef} />
            <CommentSection window="window2" comments={imageUrl2Comments} />
          </div>
        </div>
      </div>
    );
  }
}

export default Survey;
