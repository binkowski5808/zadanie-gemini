import axios from "axios";
import { CreditCard } from "./creditCardsRequests";

export function postPayment(data: CreditCard) {
  return axios.request({
    method: "POST",
    //url 200
    url: "https://run.mocky.io/v3/47b5127c-c7e4-4d6f-b010-15b056cbfa84",
    data,
  });
}
