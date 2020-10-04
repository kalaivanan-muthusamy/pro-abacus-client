import { takeEvery, fork, put, all } from "redux-saga/effects";

// Login Redux States
import { GET_PROFILE_DETAILS } from "./actionTypes";
import { setProfileDetails } from "./actions";
import { getRequest } from "../../../helpers/apiRequest";
import { ROLES } from "../../../contants";

function* getProfileDetails({ payload: role }) {
  try {
    let path;
    if (role === ROLES.STUDENT) {
      path = "students";
    } else if (role === ROLES.TEACHER) {
      path = "teachers";
    } else if (role === ROLES.ADMIN) {
      path = "admins";
    }
    const { res } = yield getRequest(path);
    yield put(setProfileDetails(res));
  } catch (err) {
    console.log("ERR", err);
  }
}

export function* getProfile() {
  yield takeEvery(GET_PROFILE_DETAILS, getProfileDetails);
}

function* ProfileSaga() {
  yield all([fork(getProfile)]);
}

export default ProfileSaga;
