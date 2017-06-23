import { SHOW_ADD_POSTIT_FORM } from '../../constants/action-types';

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ADD_POSTIT_FORM: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
