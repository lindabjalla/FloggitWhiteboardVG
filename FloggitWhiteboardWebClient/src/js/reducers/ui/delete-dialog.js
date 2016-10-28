import {SHOW_CONFIRM_DELETE_DIALOG, SET_BEING_DELETED} from '../../constants/action-types';

const initialState = {
  confirmIsVisible: false,
  idOfPostItToDelete: -1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRM_DELETE_DIALOG: {
      return Object.assign({}, state, { confirmIsVisible: action.data });
    }
    case SET_BEING_DELETED: {
      return Object.assign({}, state, { idOfPostItToDelete: action.data });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
