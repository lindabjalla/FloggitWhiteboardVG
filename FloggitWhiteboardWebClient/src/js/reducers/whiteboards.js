import {ADD_WHITEBOARD, REMOVE_WHITEBOARD, GET_ALL_WHITEBOARDS} from '../constants/action-types';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WHITEBOARD: {
      return [...state, action.data];
    }
    case REMOVE_WHITEBOARD: {
      return state.filter(whiteboard => action.data !== whiteboard.id);
    }
    case GET_ALL_WHITEBOARDS: {
      return [...action.data];
    }
    default: {
      return state;
    }
  }
};

export default reducer;