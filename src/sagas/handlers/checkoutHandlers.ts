import { postPayment } from "../requests/checkoutRequests";
import { takeLatest, call, put, select } from "@redux-saga/core/effects";
import {
  nextStep,
  pay,
  paymentFailed,
  paymentSuccessful,
  selectCreditCardChosen,
} from "../../features/checkout/checkoutSlice";
import { resetBasket } from "../../features/basket/basketSlice";
import { createStandaloneToast } from "@chakra-ui/toast";

export function* fetchPostPayment(action: ReturnType<typeof pay>) {
  const toast = createStandaloneToast();
  try {
    const creditCardChosen: ReturnType<
      typeof selectCreditCardChosen
    > = yield select(selectCreditCardChosen);
    if (creditCardChosen) {
      yield call(postPayment, creditCardChosen);
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
    } else {
      yield call(toast, {
        title: "Wystąpił błąd",
        description: "Wybierz kartę płatniczą",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      yield put(paymentFailed());
    }
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
