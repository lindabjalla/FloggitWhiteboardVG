import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import postIts from './postIts';
import deleteDialog from './ui/delete-dialog';
import editDialog from './ui/edit-postit-form';
import notes from './notes';
import addWhiteboardForm from './ui/add-whiteboard-form';
import whiteboards from './whiteboards';
import whiteboard from './whiteboard';
import addPostItForm from './ui/add-postit-form';

const reducer = combineReducers({
  addWhiteboardForm,
  postIts,
  deleteDialog,
  editDialog,
  notes,
  whiteboards,
  whiteboard,
  addPostItForm,
  routing: routerReducer
});

export default reducer;
