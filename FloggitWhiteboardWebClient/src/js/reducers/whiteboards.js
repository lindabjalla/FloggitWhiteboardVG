import {ADD_WHITEBOARD, REMOVE_WHITEBOARD, SET_ALL_WHITEBOARDS} from '../constants/action-types';

function sortById(whiteboards) {
  whiteboards.sort((b, a) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  return whiteboards;
}

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WHITEBOARD: {
      return [...state, action.data];
    }
    case REMOVE_WHITEBOARD: {
      return state.filter(whiteboard => action.data !== whiteboard.id);
    }
    case SET_ALL_WHITEBOARDS: {
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
