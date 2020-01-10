import React from 'react';
import Modal from 'react-awesome-modal';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalVisible } from '../../redux/modal/modal.selectors';
import { modalClose } from '../../redux/modal/modal.action';

// icons
import copyIcon from '../../assets/copyicon.svg';

class MyModal extends React.Component {
  state = {
    address: 'http',
  };

  copyToClipBoard = () => {
    const url = document.getElementsByClassName('url').innerText;
    console.log(url);
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
          <div>
            <h1>share this link to start voiting!</h1>
            <h1 className="url">{dispPageUrl}</h1>
            <img
              src={copyIcon}
              style={{ height: '50px', width: '50px' }}
              alt="copy icon"
              onClick={(e) => this.copyToClipBoard()}
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
