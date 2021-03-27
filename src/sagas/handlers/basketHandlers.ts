import { requestBasket } from "../requests/basketRequests";
import { takeLatest, call, put } from "@redux-saga/core/effects";
import {
  basketReceived,
  getBasket,
  basketReceivingFailed,
} from "../../features/basket/basketSlice";
import { SagaReturnType } from "redux-saga/effects";
import { createStandaloneToast } from "@chakra-ui/toast";

type RequestBasketResponse = SagaReturnType<typeof requestBasket>;

export function* fetchBasket() {
  const toast = createStandaloneToast();
  try {
    const res: RequestBasketResponse = yield call(requestBasket);
    const { data } = res;
    yield put(basketReceived(data));
  } catch (err) {
    yield call(toast, {
      title: "Wystąpił błąd",
      description: "Wystąpił błąd podczas pobierania koszyka",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    yield put(basketReceivingFailed());
  }
}

export function* watchGetBasket() {
  yield takeLatest(getBasket.type, fetchBasket);
}
