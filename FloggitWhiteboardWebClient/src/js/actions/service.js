import axios from 'axios';
import socketIOclient from 'socket.io-client';
import * as types from '../constants/action-types';

const updateAllPostIts = postIts => ({
  type: types.UPDATE_ALL_POSTITS,
  data: postIts
});

const internalError = errorText => ({
  type: types.ERROR,
  data: errorText
});

const updateAllWhiteboards = whiteboards => ({
  type: types.UPDATE_ALL_WHITEBOARDS,
  data: whiteboards
});

export const removeWhiteboard = id => ({
  type: types.REMOVE_WHITEBOARD,
  data: id
});

export const startSocket = () => (dispatch) => {
  const socket = socketIOclient('http://localhost:8081');

  socket.on('post-it-updated', (postIts) => {
    dispatch(updateAllPostIts(postIts));
  });
  socket.on('whiteboard-updated', (whiteboards) => {
    dispatch(updateAllWhiteboards(whiteboards));
  });
};

export const addPostIt = (postIt) => (dispatch) => {
  axios.post('http://localhost:8081/api/v1/post-it', postIt)
    .then(() => {})
    .catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const removePostIt = id => (dispatch) => {
  axios.delete(`http://localhost:8081/api/v1/post-it/${id}`)
    .then(() => {})
    .catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const updatePostIt = (postIt) => (dispatch) => {
  axios.put(`http://localhost:8081/api/v1/post-it/${postIt.id}`, postIt)
    .then(() => {})
    .catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const addWhiteboard = whiteboard => (dispatch) => {
  console.log(whiteboard);
  axios.post('http://localhost:8081/api/v1/whiteboard', whiteboard)
    .then(() => {})
    .catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const updateWhiteboard = whiteboard => (dispatch) => {
  axios.put(`http://localhost:8081/api/v1/whiteboard/${whiteboard.id}`, whiteboard)
    .then(() => {})
    .catch((error) => {
    dispatch(internalError(error.status));
  });
};
