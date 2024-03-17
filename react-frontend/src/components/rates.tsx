import { useEffect, useState } from "react";
import { Currency, Rate } from "../types/types";
import { getRates } from "../network/network";
import moment from "moment";
import { useParams } from "react-router-dom";

export default function Rates() {
  let { currency } = useParams();
  const [rates, setRates] = useState<Rate[]>([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getRates(currency as Currency)
      .then((response) => {
        setErrors([]);
        setRates(response.data.data);
      })
      .catch((error) => {
        setRates([]);
        setErrors(error.response.data?.errors);
      });
  }, []);

  return (
    <section>
      <h4>Display all the available current rates</h4>
      {rates && (
        <table>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Updated at</th>
          </tr>
          {rates.map((rate, index) => {
            return (
              <tr key={index}>
                <td>
                  {rate.currency}
                </td>
                <td>{rate.exchange_rate}</td>
                <td>{moment(rate.updated_at).format("LLL")}</td>
              </tr>
            );
          })}
        </table>
      )}
      {errors.map((error, index) => {
          return (
            <h5 key={index} className="pico-color-red-500">
              {error}
            </h5>
          );
        })}
    </section>
  );
}
