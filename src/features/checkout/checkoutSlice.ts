import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreditCard } from "../../sagas/requests/creditCardsRequests";

interface CheckoutState {
  creditCardChosen?: CreditCard;
  status: "idle" | "loading" | "success" | "error";
  currentStep: number;
}

const initialState: CheckoutState = {
  creditCardChosen: undefined,
  status: "idle",
  currentStep: 0,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    choseCreditCard: (state, action: PayloadAction<CreditCard>) => {
      state.creditCardChosen = action.payload;
    },
    nextStep: (state) => {
      state.currentStep = +1;
    },
    prevStep: (state) => {
      state.currentStep = -1;
    },
    pay: (state, action: PayloadAction<CreditCard>) => {
      state.status = "loading";
    },
    paymentSuccessful: (state) => {
      state.status = "success";
    },
    paymentFailed: (state) => {
      state.status = "error";
    },
    resetCheckout: (state) => initialState,
  },
});

export const {
  choseCreditCard,
  nextStep,
  prevStep,
  pay,
  paymentFailed,
  paymentSuccessful,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
