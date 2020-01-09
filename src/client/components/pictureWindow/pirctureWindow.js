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

class PictureWindow extends Component {
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

  render() {
    const { window, window1ImgUrl, window2ImgUrl } = this.props;
    let imageScreen;
    if (window === 'window1') {
      imageScreen = (
        <img
          src={window1ImgUrl || 'http://via.placeholder.com/400x300'}
          alt="Uploaded images"
          height="300"
          width="400"
        />
      );
    } else {
      imageScreen = (
        <img
          src={window2ImgUrl || 'http://via.placeholder.com/400x300'}
          alt="Uploaded images"
          height="300"
          width="400"
        />
      );
    }

    return (
      <div>
        <br />
        <input type="file" onChange={this.handleChange} />
        <br />
        {imageScreen}
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
