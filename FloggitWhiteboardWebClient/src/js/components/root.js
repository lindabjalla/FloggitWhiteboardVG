import React from 'react';

const Root = (props) =>
  <div>
    {props.children}
  </div>;

Root.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};

export default Root;
