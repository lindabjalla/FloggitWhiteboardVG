import { OPEN_MODAL } from '../../constants/action_types';

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
