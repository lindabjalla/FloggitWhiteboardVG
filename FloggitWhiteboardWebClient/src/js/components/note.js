import React from 'react';
import PropTypes from 'prop-types';

const Note = props =>
  <li className="list-group-item note" key={props.id} id={props.id}>
    <button className="badge" onClick={props.onRemove}>X</button>
    <p>{props.value}</p>
  </li>;

Note.propTypes = {
  id: PropTypes.number,
  onRemove: PropTypes.func,
  value: PropTypes.string
};

export default Note;
