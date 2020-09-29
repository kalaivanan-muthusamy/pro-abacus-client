import { GET_PROFILE_DETAILS, SET_PROFILE_DETAILS } from "./actionTypes";

export const getProfileDetails = (role) => {
  return {
    type: GET_PROFILE_DETAILS,
    payload: role,
  };
};

export const setProfileDetails = (payload) => {
  return {
    type: SET_PROFILE_DETAILS,
    payload: payload,
  };
};
