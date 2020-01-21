import React from 'react';
import Modal from 'react-awesome-modal';

import './myModal.style.scss';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalVisible } from '../../redux/modal/modal.selectors';
import { modalClose } from '../../redux/modal/modal.action';

// icons
import copyIcon from '../../assets/copyicon.svg';

class MyModal extends React.Component {
  state = {
    address: 'http://localhost:3000/survey/',
  };

  copyToClipBoard = () => {
    const pageUrl = document.querySelector('#url').innerText;

    // Document.execCommand('copy');
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => console.log('coppied!'))
      .catch((err) => console.log(err));
  };

  render() {
    const { modalClose, visible, pageUrl } = this.props;
    const dispPageUrl = this.state.address + pageUrl;
    return (
      <section>
        <Modal
          visible={visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => modalClose()}
        >
          <div className="modalWrapper">
            <h1>Thank you for your upload!</h1>
            <p>We created a page for you. Share this url.</p>
            <section />
            <h3 id="url">{dispPageUrl}</h3>
            <img
              src={copyIcon}
              className="copyIcon"
              style={{ height: '50px', width: '50px' }}
              alt="copy icon"
              onClick={() => this.copyToClipBoard()}
            />
            <a href="javascript:void(0);" onClick={() => modalClose()}>
              Close
            </a>
          </div>
        </Modal>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  modalClose: () => dispatch(modalClose()),
});

const mapStateToProps = createStructuredSelector({
  visible: selectModalVisible,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
