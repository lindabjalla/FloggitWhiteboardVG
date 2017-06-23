import { SET_TITLE } from '../constants/action-types';

const initialState = {
  name: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
