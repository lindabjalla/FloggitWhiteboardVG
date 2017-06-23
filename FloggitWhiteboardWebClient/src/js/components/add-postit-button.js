import React from 'react';
import Modal from 'react-modal';
import AddPostItForm from './add-postit-form';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    position: 'fixed',
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%'
  }
};

const AddPostItButton = (props) => {
  function closeModal() {
    props.onShowAddPostItForm(false);
  }

  function openModal() {
    props.onShowAddPostItForm(true);
  }

  function resetNotes() {
    const emptyNotes = [];
    props.onSetNotes(emptyNotes);
  }

  return (
    <div>
      <button
        type="button"
        id="add-post-it-button"
        className="btn btn-primary btn-lg"
        onClick={() => {
          openModal();
          resetNotes();
        }}
      >
        Add Post-it
      </button>
      <Modal
        isOpen={props.addPostItFormIsVisible}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AddPostItForm
          onAddPostIt={props.onAddPostIt}
          closeModal={closeModal}
          onAddNote={props.onAddNote}
          onRemoveNote={props.onRemoveNote}
          notes={props.notes}
          whiteboard={props.whiteboard}
        />
      </Modal>
    </div>
  );
};

AddPostItButton.propTypes = {
  onAddPostIt: PropTypes.func,
  onAddNote: PropTypes.func,
  onRemoveNote: PropTypes.func,
  addPostItFormIsVisible: PropTypes.bool,
  notes: PropTypes.array,
  whiteboard: PropTypes.object,
  onShowAddPostItForm: PropTypes.func,
  onSetNotes: PropTypes.func
};

export default AddPostItButton;
