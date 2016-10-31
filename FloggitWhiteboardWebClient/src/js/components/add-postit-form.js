import React from 'react';
import Note from './note';
import generateId from '../tool-box/id-generator';

const AddPostItForm = (props) => {
  let title;
  let text;
  let color;
  let noteInput;

  const handleAddNote = () => {
    const noteText = noteInput.value.trim();
    let note;
    if (noteText.length > 0) {
      note = { id: generateId(), value: noteText };
      noteInput.value = '';
      props.onAddNote(note);
    }
  };

  const handleRemoveNote = (id) => {
    props.onRemoveNote(id);
  };

  const savePostIt = () => {
    const postTitle = title.value.trim();
    const postText = text.value.trim();
    const postColor = color.value;
    const postIt = { id: -1, title: postTitle, text: postText, color: postColor, notes: props.notes };
    props.onAddPostIt(postIt, props.whiteboard);
    props.closeModal();
  };

  return (
    <form className="form-horizontal">
      <fieldset>
        <legend>Floggit</legend>
        <div className="form-group">
          <label htmlFor="inputTitle" className="col-lg-2 control-label">Title</label>
          <div className="col-lg-10">
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Title"
              ref={(c) => {
                title = c;
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="col-lg-2 control-label">Description</label>
          <div className="col-lg-10">
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
              ref={(c) => {
                text = c;
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="color" className="col-lg-2 control-label">Color</label>
          <div className="col-lg-10">
            <select
              className="form-control"
              id="color"
              ref={(c) => {
                color = c;
              }}
            >
              <option>Blue</option>
              <option>Green</option>
              <option>Pink</option>
              <option>Orange</option>
            </select>
          </div>
        </div>

        <div className="form-group" id="note-form">
          <label htmlFor="note-item" className="col-lg-2 control-label" id="note-label">Note</label>
          <div className="note-container-body col-lg-10">
            <div className="note-input">
              <input
                type="text"
                id="note-item"
                placeholder="Note"
                ref={(c) => {
                  noteInput = c;
                }}
              />
              <button
                type="button"
                id="add-note-button"
                className="btn btn-primary btn-sm"
                onClick={handleAddNote}
              >
                Add
              </button>
            </div>
            <ul className="list-group note-list">
              {props.notes.map(noteItem => (
                <Note
                  key={noteItem.id}
                  id={noteItem.id}
                  value={noteItem.value}
                  onRemove={() => handleRemoveNote(noteItem.id)}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="form-group">
          <div className="col-lg-10 col-lg-offset-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                savePostIt();
              }}
            >
              Save
            </button>
            <button type="reset" className="btn btn-default" onClick={props.closeModal}>Cancel</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

AddPostItForm.propTypes = {
  closeModal: React.PropTypes.func,
  notes: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default AddPostItForm;
