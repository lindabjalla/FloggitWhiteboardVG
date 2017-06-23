import { SHOW_EDIT_POSTIT_FORM, GET_POSTIT_TO_EDIT } from '../../constants/action-types';

const initialState = {
  visible: false,
  postItToEdit: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT_POSTIT_FORM: {
      return Object.assign({}, state, {visible: action.data});
    }
    case GET_POSTIT_TO_EDIT: {
      return Object.assign({}, state, {postItToEdit: action.data});
    }
    default: {
      return state;
    }
  }
};

export default reducer;
