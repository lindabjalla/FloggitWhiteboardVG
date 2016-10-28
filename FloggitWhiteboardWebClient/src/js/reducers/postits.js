import * as types from '../constants/action-types';

function sortByDate(postIts) {
  postIts.sort((a, b) => {
    const timeA = Date.parse(a.timeCreated);
    const timeB = Date.parse(b.timeCreated);
    if (timeA > timeB) {
      return 1;
    }
    if (timeA < timeB) {
      return -1;
    }
    return 0;
  });
  return postIts;
}

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
