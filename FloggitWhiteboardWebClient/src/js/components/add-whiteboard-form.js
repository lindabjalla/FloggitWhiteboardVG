import React from 'react';

const AddWhiteboardForm = (props) => {

  let whiteboardInput;

  function saveWhiteboard() {
    const whiteboardName = whiteboardInput.value;
    if (whiteboardName.length > 0) {
      const whiteboard = {
        id: -1,
        name: whiteboardName,
        postIts: []
      };
      props.onAddWhiteboard(whiteboard);
      whiteboardInput = '';
      props.onCloseModal();
    }
  }

  return (
    <div>
      <form className="form-horizontal">
        <fieldset>
          <legend>Add whiteboard</legend>
          <div className="form-group">
            <label htmlFor="whiteboardInput" className="col-lg-2 control-label">Whiteboard name</label>
            <div className="col-lg-10">
              <input
                type="text"
                className="form-control"
                id="whiteboardInput"
                placeholder="Whiteboard name"
                ref={(c) => {
                  whiteboardInput = c;
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => saveWhiteboard()}
              >
                Save
              </button>
              <button type="reset" className="btn btn-default" onClick={() => props.onCloseModal()}>Cancel</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>);
};

AddWhiteboardForm.propTypes = {
  onCloseModal: React.PropTypes.func
};

export default AddWhiteboardForm;
