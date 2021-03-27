import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Product,
  RequestBasketResponse,
} from "../../sagas/requests/basketRequests";

interface BasketState {
  products: Product[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: BasketState = {
  products: [],
  status: "idle",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    basketReceived: (state, action: PayloadAction<RequestBasketResponse>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.products = action.payload.products;
      state.status = "success";
    },
    basketReceivingFailed: (state) => {
      state.status = "error";
    },
    //Actions used by sagas
    getBasket: (state) => {
      state.status = "loading";
    },
    resetBasket: (state) => initialState,
  },
});

export const {
  getBasket,
  basketReceived,
  basketReceivingFailed,
  resetBasket,
} = basketSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBasketProducts = (state: RootState) => state.basket.products;
export const selectNumberOfProductsInBasket = (state: RootState) =>
  state.basket.products.length;
export const selectBasketStatus = (state: RootState) => state.basket.status;
export const selectTotalCostOfProducts = (state: RootState) =>
  state.basket.products.reduce((total, product) => total + product.price, 0);

export default basketSlice.reducer;
