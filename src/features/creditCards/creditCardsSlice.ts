import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  CreditCard,
  RequestCreditCardsResponse,
} from "../../sagas/requests/creditCardsRequests";

interface CreditCardsState {
  creditCards: CreditCard[];
  statusGetCreditCards: "idle" | "loading" | "success" | "error";
  statusAddCreditCards: "idle" | "loading" | "success" | "error";
}

const initialState: CreditCardsState = {
  creditCards: [],
  statusGetCreditCards: "idle",
  statusAddCreditCards: "idle",
};

export const creditCardsSlice = createSlice({
  name: "creditCards",
  initialState,
  reducers: {
    getCreditCards: (state) => {
      state.statusGetCreditCards = "loading";
    },
    creditCardsReceived: (
      state,
      action: PayloadAction<RequestCreditCardsResponse>
    ) => {
      state.creditCards = action.payload.cards;
      state.statusGetCreditCards = "success";
    },
    creditCardsReceivingFailed: (state) => {
      state.statusGetCreditCards = "error";
    },
    addCreditCard: (state, action: PayloadAction<CreditCard>) => {
      state.statusAddCreditCards = "loading";
    },
    creditCardAdded: (state, action: PayloadAction<CreditCard>) => {
      state.creditCards = [...state.creditCards, action.payload];
      state.statusAddCreditCards = "success";
    },
    creditCardAddingFailed: (state) => {
      state.statusAddCreditCards = "error";
    },
    resetAddCreditCardStatus: (state) => {
      state.statusAddCreditCards = "idle";
    },
  },
});

export const {
  getCreditCards,
  creditCardsReceived,
  creditCardsReceivingFailed,
  addCreditCard,
  creditCardAdded,
  creditCardAddingFailed,
  resetAddCreditCardStatus,
} = creditCardsSlice.actions;

export const selectCreditCards = (state: RootState) =>
  state.creditCards.creditCards;
export const selectAddCreditCardsStatus = (state: RootState) =>
  state.creditCards.statusAddCreditCards;
export const selectGetCreditCardsStatus = (state: RootState) =>
  state.creditCards.statusGetCreditCards;

export default creditCardsSlice.reducer;
