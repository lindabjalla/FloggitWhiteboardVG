import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import AddWhiteboardForm from './add-whiteboard-form';
import TitleBar from './titlebar';

const customStyles = {
  content: {
    position: 'fixed',
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
    height: '250px'
  }
};

const Home = (props) => {

  function closeModal() {
    props.handleOpenModal(false);
  }

  function openModal() {
    props.handleOpenModal(true);
  }

  return (
    <div>
      <TitleBar
        title={'FLOGGIT WHITEBOARD'}
      />
      <button
        className="btn btn-primary btn-lg"
        id="add-whiteboard-button"
        onClick={() => openModal()}
      >
        Add whiteboard
      </button>
      <ul className="list-group">
        { props.whiteboards.map((whiteboard, index) => (
          <li
            className="list-group-item whiteboard-list"
            key={index}
            id={whiteboard.id}
          >
            <p>
              <Link
                to={{pathname: `${whiteboard.id}`, state: { whiteboard: whiteboard }}}
              >
                {whiteboard.name}
              </Link>
            </p>
          </li>)) }
      </ul>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={() => closeModal()}
        style={customStyles}
      >
        <AddWhiteboardForm
          onCloseModal={closeModal}
          onAddWhiteboard={props.handleAddWhiteboard}
          onRemoveWhiteboard={props.handleRemoveWhiteboard}
          whiteboards={props.whiteboards}
        />
      </Modal>
    </div>);
};

const mapStateToProps = state => ({
  modalIsOpen: state.modal,
  whiteboards: state.whiteboards,
  title: state.whiteboard
});

const mapDispatchToProps = dispatch => ({
  handleAddWhiteboard: (whiteboard) => {
    dispatch(actions.addWhiteboard(whiteboard));
  },
  handleRemoveWhiteboard: (id) => {
    dispatch(actions.removeWhiteboard(id));
  },
  handleOpenModal: (visible) => {
    dispatch(actions.openModal(visible));
  }
});

Home.propTypes = ({
  handleOpenModal: React.PropTypes.func,
  whiteboards: React.PropTypes.arrayOf(React.PropTypes.object),
  modalIsOpen: React.PropTypes.bool,
  handleAddWhiteboard: React.PropTypes.func,
  handleRemoveWhiteboard: React.PropTypes.func
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
