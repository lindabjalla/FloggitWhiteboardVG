import React from 'react';
import Note from './note';
import setColor from '../tool-box/color-setter';
import generateId from '../tool-box/id-generator';

const EditDialogue = (props) => {
  let title;
  let text;
  let color;
  let noteInput;
  let notes = [];

  function setDefaultNotes() {
    notes = props.notes;
    return notes;
  }

  function handleAddNote() {
    const noteText = noteInput.value.trim();
    if (noteText.length > 0) {
      const note = { id: generateId(), value: noteText };
      noteInput.value = '';
      props.onAddNote(note);
    }
  }

  function handleRemoveNote(id) {
    props.onRemoveNote(id);
  }

  function updatePostIt() {
    const postTitle = title.value.trim();
    const postText = text.value.trim();
    const postColor = setColor(color);
    const postIt = {
      id: props.data.id,
      title: postTitle,
      text: postText,
      timeCreated: props.data.timeCreated,
      color: postColor,
      notes: props.notes
    };
    const newPostIts = updatePostIts(postIt);
    const whiteboard = {id: props.whiteboard.id, name: props.whiteboard.name, postIts: [...newPostIts]};
    props.onUpdate(postIt, whiteboard);
  }

  function updatePostIts(postIt){
    const filteredPostIts = props.whiteboard.postIts.filter(aPostIt => aPostIt.id !== postIt.id);
    return [...filteredPostIts, postIt];
  }

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
              defaultValue={props.data.title}
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
              defaultValue={props.data.text}
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
              defaultValue={props.data.color.name}
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
              {setDefaultNotes().map(noteItem => (
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
            <button type="button" className="btn btn-primary" onClick={updatePostIt}>Save</button>
            <button type="reset" className="btn btn-default" onClick={() => props.onExit()}>Cancel</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

EditDialogue.propTypes = () => ({
  data: React.PropTypes.shape.isRequired,
  onUpdate: React.PropTypes.func
});

export default EditDialogue;
