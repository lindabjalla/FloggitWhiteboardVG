import {ADD_WHITEBOARD, REMOVE_WHITEBOARD, UPDATE_ALL_WHITEBOARDS} from '../constants/action-types';
import {sortById} from '../tool-box/sort';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WHITEBOARD: {
      return [...state, action.data];
    }
    case REMOVE_WHITEBOARD: {
      return state.filter(whiteboard => action.data !== whiteboard.id);
    }
    case UPDATE_ALL_WHITEBOARDS: {
      const whiteboards = action.data;
      const sortedWhiteboards = sortById(whiteboards);
      return [...sortedWhiteboards];
    }
    default: {
      return state;
    }
  }
};

export default reducer;
