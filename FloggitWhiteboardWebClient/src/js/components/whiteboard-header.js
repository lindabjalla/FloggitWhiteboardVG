import React from 'react';
import TitleBar from './titlebar';
import AddPostItButton from './add-postit-button';

const WhiteboardHeader = props =>
  <div>
    <TitleBar
      title={props.title}
    />
    <AddPostItButton
      onAddPostIt={props.onAddPostIt}
      onAddNote={props.onAddNote}
      onRemoveNote={props.onRemoveNote}
      notes={props.notes}
      onSetNotes={props.onSetNotes}
      onShowAddPostItForm={props.onShowAddPostItForm}
      addPostItFormIsVisible={props.addPostItFormIsVisible}
      whiteboard={props.whiteboard}
    />
  </div>;

WhiteboardHeader.propTypes = {
  onAddPostIt: React.PropTypes.func,
  onAddNote: React.PropTypes.func,
  onRemoveNote: React.PropTypes.func,
  title: React.PropTypes.string,
  notes: React.PropTypes.arrayOf(React.PropTypes.object),
  onSetNotes: React.PropTypes.func,
  onShowAddPostItForm: React.PropTypes.func,
  addPostItFormIsVisible: React.PropTypes.bool,
  whiteboard: React.PropTypes.object,
};

export default WhiteboardHeader;
