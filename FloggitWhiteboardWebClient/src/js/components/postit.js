import React from 'react';

const PostIt = (props) => {
  function showEditDialogue() {
    props.onSetNotes(props.data.notes);
    props.onEdit(props.data);
  }

  function showConfirmDialogue() {
    props.onDelete(props.data.id);
  }

  return (
    <li className="post-it">
      <div className="panel-body" style={{ backgroundColor: props.data.color.code }}>
        <h6>{props.data.timeCreated}</h6>
        <h5 className="title">
          <p> { props.data.title } </p>
        </h5>
        <div id="container">
          <p className="text">{ props.data.text }</p>
        </div>
        <ul className="post-it-note-list">{props.data.notes.map(note => (
          <li key={note.id}>
            <p>{note.value}</p>
          </li>))}
        </ul>
        <div className="col-lg-10 col-lg-offset-2 buttons">
          <button className="edit-button btn btn-default btn-xs" onClick={showEditDialogue}>Edit</button>
          <button className="delete-button btn btn-danger btn-xs" onClick={showConfirmDialogue}>Delete</button>
        </div>
      </div>
    </li>
  );
};

PostIt.propTypes = {
  id: React.PropTypes.number,
  data: React.PropTypes.object,
  onEdit: React.PropTypes.func,
  confirmIsVisible: React.PropTypes.bool,
  onDelete: React.PropTypes.func
};

export default PostIt;
