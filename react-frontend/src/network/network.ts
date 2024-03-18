import axios from "axios";
import { Currency } from "../types/types";
import { API_URL } from "../config/config";

export function getRates(currency: Currency) {
  return axios({
    method: 'get',
    url: `${API_URL}/rates/${currency}`
  })
}