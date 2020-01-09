import React from 'react';
import Modal from 'react-awesome-modal';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalVisible } from '../../redux/modal/modal.selectors';
import { modalOpen, modalClose } from '../../redux/modal/modal.action';

class MyModal extends React.Component {
  render() {
    const { modalClose, modalOpen, visible } = this.props;
    return (
      <section>
        <h1>React-Modal Examples</h1>
        <input type="button" value="Open" onClick={() => modalOpen()} />
        <Modal
          visible={visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => modalClose()}
        >
          <div>
            <h1>Title</h1>
            <p>Some Contents</p>
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
  modalOpen: () => dispatch(modalOpen()),
  modalClose: () => dispatch(modalClose()),
});

const mapStateToProps = createStructuredSelector({
  visible: selectModalVisible,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);
