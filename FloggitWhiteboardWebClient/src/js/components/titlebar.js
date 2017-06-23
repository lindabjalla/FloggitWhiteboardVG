import React from 'react';
import PropTypes from 'prop-types';

const TitleBar = props =>
  <h1>{props.title}</h1>;

TitleBar.propTypes = {
  title: PropTypes.string,
};

export default TitleBar;
