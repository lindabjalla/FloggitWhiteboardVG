import * as types from '../constants/action-types';

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

export const openModal = open => ({
  type: types.OPEN_MODAL,
  data: open
});

export const setTitle = title => ({
  type: types.SET_TITLE,
  data: title
});
