import axios from 'axios';
import socketIOclient from 'socket.io-client';
import * as types from '../constants/action_types';

// const internalAddPostIt = postit => ({
//   type: types.ADD_POSTIT,
//   data: postit
// });
//
// const internalRemove = id => ({
//   type: types.REMOVE_POSTIT,
//   data: id
// });
//
// const internalUpdate = (id, postIt) => ({
//   type: types.UPDATE,
//   data: { id, postIt }
// });

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
};
//
// export const getAll = () => (dispatch) => {
//   axios.get('http://localhost:8080/api/v1/postits')
//     .then((response) => {
//       dispatch(updateAllPostits(response.data));
//     });
// };

export const add = postIt => (dispatch) => {
  axios.post('http://localhost:8080/api/v1/postits', postIt)
    .then(() => {
      // console.log(response.data);
      //
      // const newPostit = {
      //   id: response.data.id,
      //   postIt: response.data.postIt
      // };
      // dispatch(internalAddPostIt(newPostit));
      // dispatch(startSocket());
    }).catch((error) => {
      dispatch(internalError(error.status));
    });
};

export const remove = id => (dispatch) => {
  axios.delete(`http://localhost:8080/api/v1/postits/${id}`)
    .then(() => {
      // dispatch(internalRemove(id));
    }).catch((error) => {
      dispatch(internalError(error.status));
    });
};

export const update = (id, postIt) => (dispatch) => {
  console.log(postIt);
  axios.put(`http://localhost:8080/api/v1/postits/${id}`, postIt)
    .then(() => {
      // dispatch(internalUpdate(id, postIt));
    }).catch((error) => {
      dispatch(internalError(error.status));
    });
};

export const showDelete = show => ({
  type: types.SHOW_CONFIRM_DELETE_DIALOG,
  data: show
});

export const setBeingDeleted = id => ({
  type: types.SET_BEING_DELETED,
  data: id
});

export const showEditDialog = visible => ({
  type: types.SHOW_EDIT_DIALOG,
  data: visible
});

export const getPostitToEdit = postIt => ({
  type: types.GET_POSTIT_TO_EDIT,
  data: postIt
});

export const setNotes = notes => ({
  type: types.SET_NOTES,
  data: notes
});

export const addNote = note => ({
  type: types.ADD_NOTE,
  data: note
});

export const removeNote = id => ({
  type: types.REMOVE_NOTE,
  data: id
});

export const openModal = visible => ({
  type: types.OPEN_MODAL,
  data: visible
});
