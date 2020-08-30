import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { loginSuccess, logoutUserSuccess, apiError } from "./actions";
import { getRequest } from "../../../helpers/apiRequest";

function* loginUser({ payload: { user, history } }) {
  try {
    const { res, error } = yield getRequest("login");
    if (error) put(apiError(error));
    localStorage.setItem("userName", res.name);
    localStorage.setItem("role", res.role);
    yield put(loginSuccess(res));
    history.push("/dashboard");
  } catch (error) {
    put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      //    const response = yield call(fireBaseBackend.logout);
      //    yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)]);
}

export default authSaga;
