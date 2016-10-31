import * as types from '../constants/action-types';
import {sortByDate} from '../tool-box/sort';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL: {
      const postIts = action.data;
      const sortedPostIts = sortByDate(postIts);
      return [...sortedPostIts];
    }
    default: {
      return state;
    }
  }
};

export default reducer;
