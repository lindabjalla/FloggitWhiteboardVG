import {SHOW_EDIT_POSTIT_FORM, GET_POSTIT_TO_EDIT, UPDATE_EDIT_DIALOG} from '../../constants/action-types';

const initialState = {
  visible: false,
  postItToEdit: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT_POSTIT_FORM: {
      return Object.assign({}, state, { visible: action.data });
    }
    case GET_POSTIT_TO_EDIT: {
      return Object.assign({}, state, { postItToEdit: action.data });
    }
    case UPDATE_EDIT_DIALOG: {
      const postItToEdit = action.data.postits.filter(postit => postit.id === action.data.id);
      return Object.assign({}, state, { postItToEdit });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
