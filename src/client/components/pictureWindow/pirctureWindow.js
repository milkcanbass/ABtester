import React, { Component } from 'react';
import './pirctureWindow.scss';
import uuidv4 from 'uuid/v4';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { storage } from '../../../firebase/firebaseConfig';
import {
  selectWindow1Image,
  selectWindow2Image,
  selectWindow1Url,
  selectWindow2Url,
  selectWindow1Progress,
  selectWindow2Progress,
  selectWindow1Uuid,
  selectWindow2Uuid,
} from '../../redux/cardWindow/cardWindow.selectors';

import { setImage } from '../../redux/cardWindow/cardWindow.action';

class PictureWindow extends Component {
  state = {
    image: null,
    url: '',
    progress: 0,
    uuid: '',
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      const { window, setImage } = this.props;

      const image = e.target.files[0];
      const uuid = Date.now() + uuidv4();
      setImage({ window, image, uuid });
      this.setState(() => ({ image, uuid }));
    }
  };

  handleUpload = () => {
    const { image, uuid } = this.state;

    if (!image) {
      return alert('Please select images');
    }
    const uploadTask = storage.ref(`images/${uuid}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url });
          });
      },
    );
  };

  render() {
    return (
      <div>
        <progress value={this.state.progress} max="100" />
        <br />
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <br />
        <img
          src={this.state.url || 'http://via.placeholder.com/400x300'}
          alt="Uploaded images"
          height="300"
          width="400"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setImage: (window, image, uuid) => dispatch(setImage(window, image, uuid)),
});

const mapStateToProps = createStructuredSelector({
  window1Image: selectWindow1Image,
  window2Image: selectWindow2Image,
  window1Url: selectWindow1Url,
  window2Url: selectWindow2Url,
  window1Progress: selectWindow1Progress,
  window2Progress: selectWindow2Progress,
  window1Uuid: selectWindow1Uuid,
  window2Uuid: selectWindow2Uuid,
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureWindow);
