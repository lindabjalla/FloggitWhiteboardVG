import React from 'react';
import TitleBar from './titlebar';
import AddPostItButton from './addPostItButton';

const WhiteboardHeader = props => (
  <div>
    <TitleBar data={'FLOGGIT WHITEBOARD'} />
    <AddPostItButton
      onAddPostIt={props.onAddPostIt}
      onAddNote={props.onAddNote}
      onRemoveNote={props.onRemoveNote}
      notes={props.notes}
      onSetNotes={props.onSetNotes}
      onOpenModal={props.onOpenModal}
      modalIsOpen={props.modalIsOpen}
    />
  </div>);

WhiteboardHeader.propTypes = () => ({
  onAddPostIt: React.PropTypes.func,
  onAddNote: React.PropTypes.func,
  onRemoveNote: React.PropTypes.func,
});

export default WhiteboardHeader;
