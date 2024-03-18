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
  const [ascOrder, setAscOrder] = useState(true);
  // Pagination elements
  const currentItems = rates.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rates.length / 10);
  // Min, max, average
  const ratesMap = rates.map(item => item.exchange_rate);
  const ratesMax = Math.max(...ratesMap);
  const ratesMin = Math.min(...ratesMap);
  const ratesAvg = (ratesMap.reduce((a, b) => a + b, 0) / ratesMap.length).toFixed(5);;
  // Handle the page change
  const handlePageClick = (event : PaginationEvent) => {
    const newOffset = (event.selected * 10) % rates.length;
    setItemOffset(newOffset);
  };

  const switchOrder = () => {
    !ascOrder ? setRates(rates.sort((a,b) => a.id - b.id)) : setRates(rates.sort((a,b) => b.id - a.id))
    setAscOrder(!ascOrder);
    console.log(rates);
  }
  // Fetch currency data
  useEffect(() => {
    setRates([]);
    setLoading(true);
    setAscOrder(true);
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
              <th className="clickable" onClick={() => switchOrder()}>Date
                {ascOrder && <svg data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width='25px' height='25px'><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"/></svg>}
                {!ascOrder && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width='25px' height='25px'><path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"/></svg>}
              </th>
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
      {!loading && <>
        <p>Minimum: {ratesMin} {currency}</p>
        <p>Maximum: {ratesMax} {currency}</p>
        <p>Average: {ratesAvg} {currency}</p>
      </>}
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
