import axios from 'axios';
import socketIOclient from 'socket.io-client';
import * as types from '../constants/action-types';

const updateAllPostits = postIts => ({
  type: types.GET_ALL,
  data: postIts
});

const internalError = errorText => ({
  type: types.ERROR,
  data: errorText
});

export const startSocket = () => (dispatch) => {
  const socket = socketIOclient('http://localhost:8080');

  socket.on('postit-update', (postIts) => {
    dispatch(updateAllPostits(postIts));
  });
  socket.on('whiteboard-update', (whiteboards) => {
    dispatch(setAllWhiteboards(whiteboards));
  });
};

export const add = (postIt, whiteboard) => (dispatch) => {
  axios.post('http://localhost:8080/api/v1/postits', postIt)
    .then((response) => {
      const newPostIts = [...whiteboard.postIts, response.data];
      const newWhiteboard = {id: whiteboard.id, name: whiteboard.name, postIts: [...newPostIts]};
      dispatch(updateWhiteboard(newWhiteboard));
    }).catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const remove = id => (dispatch) => {
  axios.delete(`http://localhost:8080/api/v1/postits/${id}`)
    .then(() => {
    }).catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const update = (postIt) => (dispatch) => {
  axios.put(`http://localhost:8080/api/v1/postits/${postIt.id}`, postIt)
    .then(() => {
    }).catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const addWhiteboard = whiteboard => (dispatch) => {
  axios.post('http://localhost:8080/api/v1/whiteboards', whiteboard)
    .then(() => {
    }).catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const getAllWhiteboards = () => (dispatch) => {
  axios.get('http://localhost:8080/api/v1/whiteboards')
    .then((response) => {
      dispatch(setAllWhiteboards(response.data));
    }).catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const updateWhiteboard = whiteboard => (dispatch) => {
  axios.put(`http://localhost:8080/api/v1/whiteboards/${whiteboard.id}`, whiteboard)
    .then(() => {
    }).catch((error) => {
    dispatch(internalError(error.status));
  });
};

export const setAllWhiteboards = whiteboards => ({
  type: types.SET_ALL_WHITEBOARDS,
  data: whiteboards
});

export const removeWhiteboard = id => ({
  type: types.REMOVE_WHITEBOARD,
  data: id
});
