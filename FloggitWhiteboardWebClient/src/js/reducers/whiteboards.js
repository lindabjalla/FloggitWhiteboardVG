import {ADD_WHITEBOARD, REMOVE_WHITEBOARD, UPDATE_ALL_WHITEBOARDS} from '../constants/action-types';
import {sortById, sortByDate} from '../tool-box/sort';

const sortPostItsOfWhiteboards = (whiteboards)  => {
  whiteboards.forEach(whiteboard => sortByDate(whiteboard.postIts));
  return whiteboards;
};

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
      const whiteboardsWithSortedPostIts = sortPostItsOfWhiteboards(whiteboards);
      const sortedWhiteboards = sortById(whiteboardsWithSortedPostIts);
      return [...sortedWhiteboards];
    }
    default: {
      return state;
    }
  }
};

export default reducer;
