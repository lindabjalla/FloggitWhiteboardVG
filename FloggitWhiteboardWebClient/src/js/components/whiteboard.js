import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as serviceActions from '../actions/service';
import * as actions from '../actions/index';
import PostIt from './postit';
import WhiteboardHeader from './whiteboard-header';
import EditDialogue from './edit-dialogue';
import ConfirmDeletePostIt from './confirm-delete-dialog';

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
  function getWhiteboard(){
    const whiteboardId = Number(props.params.whiteboardId);
    return props.whiteboards.filter(whiteboard => whiteboard.id === whiteboardId)[0];
  }
  return (
    <div>
      <WhiteboardHeader
        onAddPostIt={props.handleAddPostIt}
        onAddNote={props.handleAddNote}
        onRemoveNote={props.handleRemoveNote}
        notes={props.notes}
        onSetNotes={props.handleSetNotes}
        onOpenModal={props.handleOpenModal}
        modalIsOpen={props.modalIsOpen}
        title = {getWhiteboard().name}
        whiteboard = {getWhiteboard()}
      />
      <div className="post-its-container">
        <ul className="list-group">
          {getWhiteboard().postIts.map(item => (
            <PostIt
              key={item.id}
              id={item.id}
              data={item}
              confirmIsVisible={props.confirmIsVisible}
              onDelete={props.handleDeleteClick}
              onEdit={props.handleEdit}
              onSetNotes={props.handleSetNotes}
            />)) }
        </ul>
      </div >
      <Modal isOpen={props.editDialogIsVisible} style={editDialogStyles}>
        <EditDialogue
          data={props.postItToEdit}
          onUpdate={props.handleUpdatePostIt}
          onExit={props.handleExit}
          onAddNote={props.handleAddNote}
          onRemoveNote={props.handleRemoveNote}
          notes={props.notes}
          whiteboard = {getWhiteboard()}
        />
      </Modal>
      <Modal isOpen={props.confirmIsVisible} style={confirmDialogStyles}>
        <ConfirmDeletePostIt
          isVisible={props.confirmIsVisible}
          idOfPostItToDelete={props.idOfPostItToDelete}
          onDelete={props.handleDeletePostIt}
          whiteboard = {getWhiteboard()}
        />
      </Modal>
    </div>);
};

const mapStateToProps = state => ({
  postits: state.postits,
  confirmIsVisible: state.deleteDialog.confirmIsVisible,
  idOfPostItToDelete: state.deleteDialog.idOfPostItToDelete,
  editDialogIsVisible: state.editDialog.visible,
  postItToEdit: state.editDialog.postItToEdit,
  notes: state.notes,
  modalIsOpen: state.modal,
  whiteboard: state.whiteboard,
  whiteboards: state.whiteboards
});

const mapDispatchToProps = dispatch => ({
  handleAddPostIt: (postit, whiteboard) => {
    dispatch(serviceActions.addPostIt(postit, whiteboard));
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
  handleEdit: (postit) => {
    dispatch(actions.showEditDialog(true));
    dispatch(actions.getPostitToEdit(postit));
  },
  handleUpdatePostIt: (postIt, whiteboard) => {
    dispatch(serviceActions.updatePostIt(postIt));
    dispatch(actions.showEditDialog(false));
    dispatch(serviceActions.updateWhiteboard(whiteboard));
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
  handleOpenModal: (visible) => {
    dispatch(actions.openModal(visible));
  },
  handleUpdateWhiteboard: (whiteboard) => {
    dispatch(serviceActions.updateWhiteboard(whiteboard));
  }
});

Whiteboard.propTypes = {
  handleAddPostIt: React.PropTypes.func,
  confirmIsVisible: React.PropTypes.bool,
  handleDeleteClick: React.PropTypes.func,
  handleEdit: React.PropTypes.func,
  handleSetNotes: React.PropTypes.func,
  editDialogIsVisible: React.PropTypes.bool,
  handleUpdatePostIt: React.PropTypes.func,
  handleExit: React.PropTypes.func,
  handleAddNote: React.PropTypes.func,
  handleRemoveNote: React.PropTypes.func,
  idOfPostItToDelete: React.PropTypes.number,
  handleDeletePostIt: React.PropTypes.func,
  handleOpenModal: React.PropTypes.func,
  notes: React.PropTypes.arrayOf(React.PropTypes.object),
  modalIsOpen: React.PropTypes.bool,
  postItToEdit: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
