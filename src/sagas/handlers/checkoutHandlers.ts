import { postPayment } from "../requests/checkoutRequests";
import { takeLatest, call, put } from "@redux-saga/core/effects";
import {
  nextStep,
  pay,
  paymentFailed,
  paymentSuccessful,
} from "../../features/checkout/checkoutSlice";
import { resetBasket } from "../../features/basket/basketSlice";
import { createStandaloneToast } from "@chakra-ui/toast";

export function* fetchPostPayment(action: ReturnType<typeof pay>) {
  const toast = createStandaloneToast();
  try {
    yield call(postPayment, action.payload);
    yield put(paymentSuccessful());
    yield call(toast, {
      title: "Sukces",
      description: "Płatność przebiegła poprawnie",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    yield put(resetBasket());
    yield put(nextStep());
  } catch (err) {
    yield call(toast, {
      title: "Wystąpił błąd",
      description: "Wystąpił błąd podczas płatności",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    yield put(paymentFailed());
  }
}

export function* watchPay() {
  yield takeLatest(pay.type, fetchPostPayment);
}
