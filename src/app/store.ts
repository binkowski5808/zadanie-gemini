import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import basketReducer from "../features/basket/basketSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import creditCardsReducer from "../features/creditCards/creditCardsSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas/rootSaga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    checkout: checkoutReducer,
    creditCards: creditCardsReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare],
});

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
