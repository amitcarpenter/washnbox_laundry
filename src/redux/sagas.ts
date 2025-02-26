import { put, all, takeEvery, call } from "redux-saga/effects";
import { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } from "./dataSlice";
import { getUserToken, makeGetApiCall } from "../utils/helper";
import { PROVIDER_URLS } from "../utils/config";

// API Call Function
function* fetchOrdersSaga() {
  try {
    const token = yield call(getUserToken); // Get token
    console.log("Token from Saga:", token);

    if (!token) {
      throw new Error("No token found");
    }

    const url = PROVIDER_URLS.GET_PROVIDER_ORDERS;
    const { result } = yield call(makeGetApiCall, url, token);

    console.log("result ===>",result)

    yield put(fetchOrdersSuccess(result?.data || []));
  } catch (error) {
    yield put(fetchOrdersFailure(error?.message || "Something went wrong"));
  }
}

// Watcher Saga
function* watchFetchOrders() {
  yield takeEvery(fetchOrdersRequest.type, fetchOrdersSaga);
}

// Root Saga
export default function* rootSaga() {
  yield all([watchFetchOrders()]);
}
