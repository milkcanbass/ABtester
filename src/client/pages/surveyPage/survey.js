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

  roundToTwo(num) {
    return +`${Math.round(`${num}e+2`)}e-2`;
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
    const like1Percentage = this.roundToTwo((imageUrl1Like / talLike) * 100) || 0;
    const like2Percentage = this.roundToTwo((imageUrl2Like / talLike) * 100) || 0;

    return (
      <div className="surveyWrapper">
        <div className="picWidRapper">
          <p className="title">{title}</p>
          <div className="wrapWrap">
            <div className="win1Wrapper">
              <div className="centerLine" />
              <PictureWindow
                window="window1"
                surveyPage
                imageUrl1Like={imageUrl1Like}
                like1Percentage={like1Percentage}
                imageUrl1={imageUrl1}
                pageRef={pageRef}
              />
              <CommentSection window="window1" comments={imageUrl1Comments} />
            </div>
            <div className="win2Wrapper">
              <PictureWindow
                window="window2"
                surveyPage
                imageUrl2Like={imageUrl2Like}
                like2Percentage={like2Percentage}
                imageUrl2={imageUrl2}
                pageRef={pageRef}
              />
              <CommentSection window="window2" comments={imageUrl2Comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Survey;
