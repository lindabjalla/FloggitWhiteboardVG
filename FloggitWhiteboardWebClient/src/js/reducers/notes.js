import {SET_NOTES, ADD_NOTE, REMOVE_NOTE} from '../constants/action-types';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES: {
      return action.data;
    }
    case ADD_NOTE: {
      return [...state, action.data];
    }
    case REMOVE_NOTE: {
      return state.filter(note => action.data !== note.id);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
