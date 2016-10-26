import { combineReducers } from 'redux';

import postits from './postits';
import ui from './ui/delete-dialog';
import editDialog from './ui/edit-dialog';
import notes from './notes';
import modal from './ui/modal';

const reducer = combineReducers({
  postits, ui, editDialog, notes, modal
});

export default reducer;
