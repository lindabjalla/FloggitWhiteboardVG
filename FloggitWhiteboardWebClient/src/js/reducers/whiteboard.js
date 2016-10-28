import {SET_TITLE, UPDATE_WHITEBOARD} from '../constants/action-types';

const initialState = {
  name: '',
  postIts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE: {
      return Object.assign({}, state, { name: action.data });
    }
    case UPDATE_WHITEBOARD: {
      return Object.assign({}, action.data);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
