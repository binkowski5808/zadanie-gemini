import { createStandaloneToast } from "@chakra-ui/toast";
import { takeLatest, call, put, select } from "@redux-saga/core/effects";
import { SagaReturnType } from "redux-saga/effects";
import { choseCreditCard } from "../../features/checkout/checkoutSlice";
import {
  addCreditCard,
  creditCardsReceived,
  creditCardsReceivingFailed,
  getCreditCards,
  creditCardAdded,
  creditCardAddingFailed,
  selectCreditCards,
} from "../../features/creditCards/creditCardsSlice";
import {
  postCreditCardRequest,
  requestCreditCards,
} from "../requests/creditCardsRequests";

export function* fetchCreditCards() {
  const toast = createStandaloneToast();
  try {
    const res: SagaReturnType<typeof requestCreditCards> = yield call(
      requestCreditCards
    );
    const { data } = res;
    yield put(creditCardsReceived(data));
  } catch (err) {
    yield call(toast, {
      title: "Wystąpił błąd",
      description: "Wystąpił błąd podczas pobierania kart kredytowych",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    yield put(creditCardsReceivingFailed());
  }
}

export function* fetchPostCreditCard(action: ReturnType<typeof addCreditCard>) {
  const toast = createStandaloneToast();
  try {
    const creditCards: ReturnType<typeof selectCreditCards> = yield select(
      selectCreditCards
    );
    if (
      creditCards.some(
        (creditCard) => creditCard.number === action.payload.number
      )
    ) {
      yield call(toast, {
        title: "Wystąpił błąd",
        description: "Podany numer karty już istnieje w systemie",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      yield put(creditCardAddingFailed());
    } else {
      yield call(postCreditCardRequest, action.payload);
      yield put(creditCardAdded(action.payload));
      yield put(choseCreditCard(action.payload));
    }
  } catch (err) {
    yield call(toast, {
      title: "Wystąpił błąd",
      description: "Wystąpił błąd podczas dodawania karty płatniczej",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    yield put(creditCardAddingFailed());
  }
}

export function* watchGetCreditCards() {
  yield takeLatest(getCreditCards.type, fetchCreditCards);
}

export function* watchAddCreditCard() {
  yield takeLatest(addCreditCard.type, fetchPostCreditCard);
}
