import { all, call, spawn } from "@redux-saga/core/effects";
import { watchGetBasket } from "./handlers/basketHandlers";

// single entry point to start all Sagas at once
export function* rootSaga() {
  const sagas = [watchGetBasket];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
