import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import basketReducer from "../features/basket/basketSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas/rootSaga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare],
});

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
