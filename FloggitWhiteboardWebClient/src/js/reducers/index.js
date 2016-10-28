import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import postits from './postits';
import deleteDialog from './ui/delete-dialog';
import editDialog from './ui/edit-dialog';
import notes from './notes';
import modal from './ui/modal';
import whiteboards from './whiteboards';
import whiteboard from './whiteboard';

const reducer = combineReducers({
  postits, deleteDialog, editDialog, notes, modal, whiteboards, whiteboard, routing: routerReducer
});

export default reducer;
