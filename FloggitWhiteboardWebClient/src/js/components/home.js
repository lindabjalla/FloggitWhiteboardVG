import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as serviceActions from '../actions/service';
import * as actions from '../actions/index';
import AddWhiteboardForm from './add-whiteboard-form';
import TitleBar from './titlebar';
import PropTypes from 'prop-types';

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
  const closeModal = () => {
    props.handleShowAddWhiteboardForm(false);
  };

  const openModal = () => {
    props.handleShowAddWhiteboardForm(true);
  };

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
        Add Whiteboard
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
                to={{ pathname: `${whiteboard.id}`, state: { whiteboard: whiteboard } }}
              >
                {whiteboard.name}
              </Link>
            </p>
          </li>)) }
      </ul>
      <Modal
        isOpen={props.addWhiteboardFormIsVisible}
        contentLabel="Modal"
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
  whiteboards: state.whiteboards,
  title: state.whiteboard,
  addWhiteboardFormIsVisible: state.addWhiteboardForm
});

const mapDispatchToProps = dispatch => ({
  handleAddWhiteboard: (whiteboard) => {
    dispatch(serviceActions.addWhiteboard(whiteboard));
  },
  handleRemoveWhiteboard: (id) => {
    dispatch(serviceActions.removeWhiteboard(id));
  },
  handleShowAddWhiteboardForm: (visible) => {
    dispatch(actions.showAddWhiteboardForm(visible));
  }
});

Home.propTypes = {
  handleShowAddWhiteboardForm: PropTypes.func,
  whiteboards: PropTypes.array,
  addWhiteboardFormIsVisible: PropTypes.bool,
  handleAddWhiteboard: PropTypes.func,
  handleRemoveWhiteboard: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
