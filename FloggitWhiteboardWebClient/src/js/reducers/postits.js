import * as types from '../constants/action_types';

const initialState = [];

function sortByDate(postIts) {
  postIts.sort((a, b) => {
    const timeA = Date.parse(a.postIt.timeCreated);
    const timeB = Date.parse(b.postIt.timeCreated);
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.ADD_POSTIT: {
    //   console.log(action.data);
    //   const postit = Object.assign({}, action.data);
    //   return [...state, postit];
    // }
    // case types.REMOVE_POSTIT: {
    //   const id = action.data;
    //   return state.filter(postit => postit.id !== id);
    // }
    case types.GET_ALL: {
      const postIts = action.data;
      const sortedPostIts = sortByDate(postIts);
      return [...sortedPostIts];
    }
    // case types.UPDATE: {
    //   const postIt = action.data.postIt;
    //   const filteredPostIts = state.filter(aPostIt => aPostIt.id !== action.data.id);
    //   const newPostIt = Object.assign({}, { id: action.data.id, postIt });
    //   const postIts = [...filteredPostIts, newPostIt];
    //   const sortedPostIts = sortByDate(postIts);
    //   return [...sortedPostIts];
    // }
    default: {
      return state;
    }
  }
};

export default reducer;
