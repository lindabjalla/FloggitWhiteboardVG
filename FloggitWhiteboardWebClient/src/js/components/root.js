import React from 'react';
import PropTypes from 'prop-types';

const Root = props =>
  <div>
    { props.children }
  </div>;

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node
  ])
};

export default Root;
