import React from 'react';

const ConfirmDeletePostIt = (props) => {
  function updatePostIts(){
    return props.whiteboard.postIts.filter(postIt => postIt.id !== props.idOfPostItToDelete);
  }

  function handleOk() {
    const newPostIts = updatePostIts();
    const whiteboard = {id: props.whiteboard.id, name: props.whiteboard.name, postIts: [...newPostIts]};
    props.onDelete(props.idOfPostItToDelete, whiteboard);
  }

  function handleCancel() {
    props.onDelete();
  }

  return (
    <div>
      <div>
        <p>Do you really want to delete this post-it?</p>
      </div>
      <div className="col-lg-10 col-lg-offset-2">
        <button type="reset" className="btn btn-default" onClick={handleCancel}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={handleOk}>OK</button>
      </div>
    </div>
  );
};

ConfirmDeletePostIt.propTypes = () => ({
  isVisible: React.PropTypes.bool,
  idOfPostItToDelete: React.PropTypes.number,
  onDelete: React.PropTypes.func
});

export default ConfirmDeletePostIt;
