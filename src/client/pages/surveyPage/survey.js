import React, { Component } from 'react';
import './survey.style.scss';

// firebase
import { db } from '../../../firebase/firebaseConfig';

// Component
import PictureWindow from '../../components/pictureWindow/pirctureWindow';

class Survey extends Component {
  state = {
    imageUrl1: '',
    imageUrl2: '',
  };

  componentDidMount() {
    const addrres = this.props.match.params.survey;
    const pageRef = db.collection('pages').doc(addrres);
    pageRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('no pages exists');
        } else {
          console.log(doc.data());
          this.setState({
            imageUrl1: doc.data().imageUrl1,
            imageUrl2: doc.data().imageUrl2,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="cardWrapper">
        <PictureWindow window="window1" surveyPage imageUrl1={this.state.imageUrl1} />
        <PictureWindow window="window2" surveyPage imageUrl2={this.state.imageUrl2} />
      </div>
    );
  }
}

export default Survey;
