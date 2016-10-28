import React from 'react';

const TitleBar = (props) => {
  return (<h1>{props.title}</h1>);
};

TitleBar.propTypes = {
  title: React.PropTypes.string,
};

export default TitleBar;
