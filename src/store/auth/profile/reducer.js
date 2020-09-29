import {
  SET_PROFILE_DETAILS,
} from "./actionTypes";

const initialState = {};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DETAILS:
      state = { ...state, profileDetails: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
