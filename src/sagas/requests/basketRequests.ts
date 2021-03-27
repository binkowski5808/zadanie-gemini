import axios from "axios";

export function requestBasket() {
  return axios.request<RequestBasketResponse>({
    method: "GET",
    //url 200
    url: "https://run.mocky.io/v3/ec008089-1d82-4840-99fc-ce3a54284e9f",
    //url 502
    // url: "https://run.mocky.io/v3/f3e4dbb9-4e66-4962-a276-dfaa0af474fe",
  });
}

export interface RequestBasketResponse {
  products: Product[];
}
export interface Product {
  id: number;
  price: number;
  name: string;
}
