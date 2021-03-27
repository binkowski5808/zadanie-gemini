import axios from "axios";

export function requestCreditCards() {
  return axios.request<RequestCreditCardsResponse>({
    method: "GET",
    //url 200
    url: "https://run.mocky.io/v3/4a662316-6263-41d6-bcd9-1479f33ed2b2",
  });
}

export function postCreditCardRequest(data: CreditCard) {
  return axios.request({
    method: "POST",
    //url 200
    url: "https://run.mocky.io/v3/47b5127c-c7e4-4d6f-b010-15b056cbfa84",
    data,
  });
}

export interface RequestCreditCardsResponse {
  cards: CreditCard[];
}
export interface CreditCard {
  id: number;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}
