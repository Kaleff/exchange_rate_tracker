import axios from "axios";
import { Currency } from "../types/types";

export function getRates(currency: Currency) {
  return axios({
    method: 'get',
    url: `http://localhost/api/rates/${currency}`
  })
}