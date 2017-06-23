import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import * as serviceActions from '../actions/service';
import * as actions from '../actions/index';
import PostIt from './postit';
import WhiteboardHeader from './whiteboard-header';
import EditDialogue from './edit-dialogue';
import ConfirmDeletePostIt from './confirm-delete-dialog';
import PropTypes from 'prop-types';

const confirmDialogStyles = {
  content: {
    top: '40%',
    left: '20%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const editDialogStyles = {
  content: {
    position: 'fixed',
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%'
  }
};

const Whiteboard = (props) => {
  const getWhiteboard = () => {
    const whiteboardId = Number(props.params.whiteboardId);
    return props.whiteboards.filter(whiteboard => whiteboard.id === whiteboardId)[0];
  };

  const getPostIts = () => {
    const whiteboardId = Number(props.params.whiteboardId);
    return props.postIts.filter(postIt => postIt.whiteboardId === whiteboardId);
  };

  return (
    <div>
      <WhiteboardHeader
        onAddPostIt={props.handleAddPostIt}
        onAddNote={props.handleAddNote}
        onRemoveNote={props.handleRemoveNote}
        notes={props.notes}
        onSetNotes={props.handleSetNotes}
        onShowAddPostItForm={props.handleShowAddPostItForm}
        addPostItFormIsVisible={props.addPostItFormIsVisible}
        title={getWhiteboard().name}
        whiteboard={getWhiteboard()}
      />
      <div className="post-its-container">
        <ul className="list-group">
          {getPostIts().map(item => (
            <PostIt
              key={item.id}
              id={item.id}
              data={item}
              onDelete={props.handleDeleteClick}
              onEdit={props.handleEditClick}
              onSetNotes={props.handleSetNotes}
            />)) }
        </ul>
      </div >
      <Modal isOpen={props.editDialogIsVisible} style={editDialogStyles}>
        <EditDialogue
          data={props.postItToEdit}
          onUpdate={props.handleUpdatePostIt}
          onAddNote={props.handleAddNote}
          onRemoveNote={props.handleRemoveNote}
          onExit={props.handleExit}
          notes={props.notes}
          whiteboard={getWhiteboard()}
        />
      </Modal>
      <Modal isOpen={props.confirmIsVisible} style={confirmDialogStyles}>
        <ConfirmDeletePostIt
          modalIsOpen={props.confirmIsVisible}
          idOfPostItToDelete={props.idOfPostItToDelete}
          onDelete={props.handleDeletePostIt}
          whiteboard={getWhiteboard()}
        />
      </Modal>
    </div>);
};

const mapStateToProps = state => ({
  postIts: state.postIts,
  confirmIsVisible: state.deleteDialog.confirmIsVisible,
  idOfPostItToDelete: state.deleteDialog.idOfPostItToDelete,
  editDialogIsVisible: state.editDialog.visible,
  postItToEdit: state.editDialog.postItToEdit,
  notes: state.notes,
  addPostItFormIsVisible: state.addPostItForm,
  whiteboard: state.whiteboard,
  whiteboards: state.whiteboards
});

const mapDispatchToProps = dispatch => ({
  handleAddPostIt: (postit) => {
    dispatch(serviceActions.addPostIt(postit));
  },
  handleDeleteClick: (id) => {
    dispatch(actions.setIdOfPostItToDelete(id));
    dispatch(actions.showDelete(true));
  },
  handleDeletePostIt: (id, whiteboard) => {
    if (!id) {
      dispatch(actions.setIdOfPostItToDelete(-1));
      dispatch(actions.showDelete(false));
    }
    dispatch(serviceActions.removePostIt(id));
    dispatch(actions.setIdOfPostItToDelete(-1));
    dispatch(actions.showDelete(false));
    dispatch(serviceActions.updateWhiteboard(whiteboard));
  },
  handleEditClick: (postit) => {
    dispatch(actions.showEditDialog(true));
    dispatch(actions.getPostitToEdit(postit));
  },
  handleUpdatePostIt: (postIt) => {

    dispatch(serviceActions.updatePostIt(postIt));
    dispatch(actions.showEditDialog(false));
  },
  handleExit: () => {
    dispatch(actions.showEditDialog(false));
  },
  handleSetNotes: (notes) => {
    dispatch(actions.setNotes(notes));
  },
  handleAddNote: (note) => {
    dispatch(actions.addNote(note));
  },
  handleRemoveNote: (id) => {
    dispatch(actions.removeNote(id));
  },
  handleShowAddPostItForm: (visible) => {
    dispatch(actions.showAddPostItForm(visible));
  },
  handleUpdateWhiteboard: (whiteboard) => {
    dispatch(serviceActions.updateWhiteboard(whiteboard));
  }
});

Whiteboard.propTypes = {
  handleAddPostIt: PropTypes.func,
  confirmIsVisible: PropTypes.bool,
  handleDeleteClick: PropTypes.func,
  handleEdit: PropTypes.func,
  handleSetNotes: PropTypes.func,
  editDialogIsVisible: PropTypes.bool,
  handleUpdatePostIt: PropTypes.func,
  handleExit: PropTypes.func,
  handleAddNote: PropTypes.func,
  handleRemoveNote: PropTypes.func,
  idOfPostItToDelete: PropTypes.number,
  handleDeletePostIt: PropTypes.func,
  handleShowAddPostItForm: PropTypes.func,
  notes: PropTypes.array,
  addPostItFormIsVisible: PropTypes.bool,
  postItToEdit: PropTypes.object,
  params: PropTypes.object,
  whiteboards: PropTypes.array,
  postIts: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
