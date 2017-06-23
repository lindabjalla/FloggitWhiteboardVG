import React from 'react';
import TitleBar from './titlebar';
import AddPostItButton from './add-postit-button';
import PropTypes from 'prop-types';

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
  onAddPostIt: PropTypes.func,
  onAddNote: PropTypes.func,
  onRemoveNote: PropTypes.func,
  title: PropTypes.string,
  notes: PropTypes.array,
  onSetNotes: PropTypes.func,
  onShowAddPostItForm: PropTypes.func,
  addPostItFormIsVisible: PropTypes.bool,
  whiteboard: PropTypes.object,
};

export default WhiteboardHeader;
