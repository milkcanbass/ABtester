import React, { Component } from 'react';
import './pirctureWindow.scss';
import { storage } from '../../../firebase/firebaseConfig';

class PictureWindow extends Component {
  state = {
    image: null,
    url: '',
    progress: 0,
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snpashot);

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

export default PictureWindow;
