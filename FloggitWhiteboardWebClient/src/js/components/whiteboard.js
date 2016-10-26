import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostIt from './postit';
import WhiteboardHeader from './whiteboardHeader';
import EditDialogue from './editDialogue';
import ConfirmDeletePostIt from './confirmDeleteDialog';

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

const Whiteboard = props =>
  <div>
    <WhiteboardHeader
      onAddPostIt={props.handleAdd}
      onAddNote={props.handleAddNote}
      onRemoveNote={props.handleRemoveNote}
      notes={props.notes}
      onSetNotes={props.handleSetNotes}
      onOpenModal={props.handleOpenModal}
      modalIsOpen={props.modalIsOpen}
    />
    <div className="post-its-container">
      <ul className="list-group">
        {props.postits.map(item => (
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
        data={props.postitToEdit}
        onUpdate={props.handleUpdatePostIt}
        onExit={props.handleExit}
        onAddNote={props.handleAddNote}
        onRemoveNote={props.handleRemoveNote}
        notes={props.notes}
      />
    </Modal>
    <Modal isOpen={props.confirmIsVisible} style={confirmDialogStyles}>
      <ConfirmDeletePostIt
        isVisible={props.confirmIsVisible}
        id={props.beingDeleted}
        onDelete={props.handleDeletePostIt}
      />
    </Modal>
  </div>;

const mapStateToProps = state => ({
  postits: state.postits,
  confirmIsVisible: state.ui.confirmIsVisible,
  beingDeleted: state.ui.beingDeleted,
  editDialogIsVisible: state.editDialog.visible,
  postitToEdit: state.editDialog.postItToEdit,
  notes: state.notes,
  modalIsOpen: state.modal
});

const mapDispatchToProps = dispatch => ({
  handleAdd: (postit) => {
    dispatch(actions.add(postit));
  },
  handleDeleteClick: (id) => {
    dispatch(actions.setBeingDeleted(id));
    dispatch(actions.showDelete(true));
  },
  handleDeletePostIt: (id) => {
    if (!id) {
      dispatch(actions.setBeingDeleted(0));
      dispatch(actions.showDelete(false));
    }
    dispatch(actions.remove(id));
    dispatch(actions.setBeingDeleted(0));
    dispatch(actions.showDelete(false));
    // dispatch(actions.getAll());
  },
  handleEdit: (postit) => {
    dispatch(actions.showEditDialog(true));
    dispatch(actions.getPostitToEdit(postit));
  },
  handleUpdatePostIt: (id, postIt) => {
    dispatch(actions.update(id, postIt));
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
  handleOpenModal: (visible) => {
    dispatch(actions.openModal(visible));
  }
});

Whiteboard.propTypes = () => ({
  handleAdd: React.PropTypes.func,
  confirmIsVisible: React.PropTypes.bool,
  handleDeleteClick: React.PropTypes.func,
  handleEdit: React.PropTypes.func,
  handleSetNotes: React.PropTypes.func,
  editDialogIsVisible: React.PropTypes.bool,
  handleUpdatePostIt: React.PropTypes.func,
  handleExit: React.PropTypes.func,
  handleAddNote: React.PropTypes.func,
  handleRemoveNote: React.PropTypes.func,
  beingDeleted: React.PropTypes.number,
  handleDeletePostIt: React.PropTypes.func,
  handleOpenModal: React.PropTypes.func
});

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
