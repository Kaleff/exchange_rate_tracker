import { useEffect, useState } from "react";
import { Currency, PaginationEvent, Rate } from "../types/types";
import { getRates } from "../network/network";
import moment from "moment";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

export default function Rates() {
  // Data offset
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  // Currency data
  let { currency } = useParams();
  const [rates, setRates] = useState<Rate[]>([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  // Pagination elements
  const currentItems = rates.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rates.length / 10);

  const handlePageClick = (event : PaginationEvent) => {
    const newOffset = (event.selected * 10) % rates.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setRates([]);
    setLoading(true);
    getRates(currency as Currency)
      .then((response) => {
        setErrors([]);
        setRates(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setRates([]);
        setErrors(error.response?.data?.errors);
        setLoading(false);
      });
  }, [currency]);

  return (
    <section>
      <h4>Display all the available current rates</h4>
      {rates && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>EUR to {currency}</th>
            </tr>
          </thead>
          {currentItems.map((rate, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{moment(rate.updated_at).format("LLL")}</td>
                  <td>{rate.exchange_rate}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
      <SyncLoader loading={loading} size={15} color="#646cff" />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
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
