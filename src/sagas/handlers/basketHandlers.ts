import { requestBasket } from "../requests/basketRequests";
import { takeLatest, call, put } from "@redux-saga/core/effects";
import {
  basketReceived,
  getBasket,
  basketReceivingFailed,
} from "../../features/basket/basketSlice";
import { SagaReturnType } from "redux-saga/effects";

type RequestBasketResponse = SagaReturnType<typeof requestBasket>;

export function* fetchBasket() {
  try {
    const res: RequestBasketResponse = yield call(requestBasket);
    const { data } = res;
    yield put(basketReceived(data));
  } catch (err) {
    yield put(basketReceivingFailed());
  }
}

export function* watchGetBasket() {
  yield takeLatest(getBasket.type, fetchBasket);
}
