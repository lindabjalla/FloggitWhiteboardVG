import React from 'react';
import Modal from 'react-modal';
import AddPostItForm from './add-postit-form';

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
        onClick={() => { openModal(); resetNotes(); }}
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
  onAddPostIt: React.PropTypes.func,
  onAddNote: React.PropTypes.func,
  onRemoveNote: React.PropTypes.func,
  addPostItFormIsVisible: React.PropTypes.bool,
  notes: React.PropTypes.arrayOf(React.PropTypes.object),
  whiteboard: React.PropTypes.object,
};

export default AddPostItButton;
