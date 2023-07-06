import React, { useState } from 'react';
import styles from '../../styles/PlaceOrderPage.module.css';
import OptionChain from '@/components/OptionChain';
import { GET_OPTION_CHAIN, GET_QUOTE_API } from '@/utils/apiLinks';
// import { convertToKeyValue } from '@/utils/stock_names';
import { stocks_names_breeze } from '@/utils/stock_names';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OrderPopUp from '@/components/OrderPopUp';

const stock_names = (Object.values(stocks_names_breeze[0]))
const stocks = stock_names

const PlaceOrderPage = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [optionChainLoaded, setOptionChainLoaded] = useState(false);
  const [callOptionArray, setCallOptionArray] = useState([]);
  const [putOptionArray, setPutOptionArray] = useState([]);
  const [selectedDateExpiry, setSelectedDateExpiry] = useState(null);

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setShowAutocomplete(false); // Close the autocomplete
  };

  const fetchStockPrice = async (stock) => {
    try {
      const response = await fetch(GET_QUOTE_API);
      const data = await response.json();
      const price = data.Success[0]?.ltp || 0;
      setSelectedStockPrice(price);
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  const handleInstrumentSelection = (instrument) => {
    setSelectedInstrument(instrument);
  };

  const handlePlaceOrder = () => {
    console.log('Order placed!');
  };

  const handleConfirmation = () => {
    if (selectedStock && selectedInstrument) {
      if (window.confirm('Confirm placing the order?')) {
        handlePlaceOrder();
      }
    } else {
      alert('Please select both a stock and an instrument!');
    }
  };

  const handleGetActivePositions = () => {
    console.log('Fetching active positions...');
  };

  const handleDateChangeFrom = (date) => {
    setSelectedDateExpiry(date);
  };

  const filterDatePicker = (date) => {
    const selectedDay = date.getDay();
    return selectedDay === 4 && date >= new Date();
  };

  const handleLoadOptionChain = async () => {
    // const keyValuePairs = convertToKeyValue();
    console.log("key value pairs", stocks_names_breeze);
    console.log("key from value", getKeyByValue(stocks_names_breeze[0], selectedStock))
    try {
      const response = await fetch(GET_OPTION_CHAIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
          expiry: selectedDateExpiry
        }),
      });
      const data = await response.json();
      if (data[0]?.Error) {
        console.log("error", data[0]?.Error)
        alert(data[0]?.Error);
      }
      console.log("data is", data)
      const callPayload = data[0]?.Success || [];
      const putPayload = data[1]?.Success || [];
      const filteredCallPayload = callPayload.filter((callOption) => {
        const correspondingPutOption = putPayload.find(
          (putOption) =>
            putOption.expiry_date === callOption.expiry_date &&
            putOption.strike_price === callOption.strike_price
        );
        return callOption.open_interest !== 0 || correspondingPutOption?.open_interest !== 0;
      });

      const filteredPutPayload = putPayload.filter((putOption) => {
        const correspondingCallOption = callPayload.find(
          (callOption) =>
            callOption.expiry_date === putOption.expiry_date &&
            callOption.strike_price === putOption.strike_price
        );
        return putOption.open_interest !== 0 || correspondingCallOption?.open_interest !== 0;
      });
      setCallOptionArray(filteredCallPayload);
      setPutOptionArray(filteredPutPayload);
      console.log(filteredPutPayload[0])
      setOptionChainLoaded(true);


    } catch (error) {
      console.error('Error loading option chain:', error);
    }
  };

  return (
    <div className={styles.container}>
      
      <OrderPopUp
        stockName="AAPL"
        lastTradedPrice="150.50"
        lastTradedDate="2023-07-06"
        high="155.20"
        low="148.80"
        open="151.00"
        prevClose="148.90"
        productType="Equity"
        totalTradedQuantity="100000"
      />
      <div style={{ display: "flex" }}>
        <img src="place_order.jpg" style={{ width: "250px", "height": "150px", display: "flex", margin: "auto", marginBottom: "2%" }} ></img>
      </div>

      <h1 className={styles.title}>Lets Trade!</h1>
      <div style={{ display: 'flex' }}>
        <div className={styles.leftSection} >
          <div className={styles.inputGroup}>
            <label htmlFor="stock" className={styles.label}>
              Stock / Index:
            </label>
            <div className={styles.autocomplete}>
  <input
    type="text"
    id="stock"
    className={styles.input}
    placeholder="Search for a stock..."
    value={selectedStock}
    onChange={(e) => {
      setSelectedStock(e.target.value);
      setShowAutocomplete(true);
    }}
  />
  {showAutocomplete && (
    <ul className={styles.autocompleteList}>
      {stocks
        .filter((stock) =>
          stock.toLowerCase().startsWith(selectedStock.toLowerCase())
        )
        .filter((stock, index, self) =>
          self.findIndex((s) => s.toLowerCase() === stock.toLowerCase()) === index
        )
        .slice(0, 5)
        .map((stock) => (
          <li key={stock} onClick={() => handleStockSelection(stock)}>
            {stock}
          </li>
        ))}
    </ul>
  )}
</div>

          </div>
          <div className={styles.inputGroup}>
            {/* <label htmlFor="instrument" className={styles.label}>
              Instrument:
            </label>
            <select
              id="instrument"
              className={styles.select}
              value={selectedInstrument}
              onChange={(e) => handleInstrumentSelection(e.target.value)}
            >
              <option value="">Select instrument</option>
              <option value="options">Options</option>
              <option value="futures">Futures</option>
              <option value="stocks">Stocks</option>
            </select> */}
          </div>
          <div className={styles.autocomplete}>
            <label htmlFor="instrument" className={styles.label}>
              Expiry (Only for Options):
            </label>
            <DatePicker
              selected={selectedDateExpiry}
              onChange={handleDateChangeFrom}
              dateFormat="yyyy-MM-dd"
              // className={styles.datePicker}
              filterDate={filterDatePicker}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.placeOrderButton} onClick={handleConfirmation}>
              Place Order
            </button>
            <button className={styles.getPositionsButton} onClick={handleGetActivePositions}>
              Get All Active Positions
            </button>
            <button className={styles.loadOptionChainButton} onClick={handleLoadOptionChain}>
              Load Option Chain
            </button>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.optionChainContainer}>

            <OptionChain callPayload={callOptionArray} putPayload={putOptionArray} />

          </div>
        </div>
        
      </div>


    </div>
  );
};
export default PlaceOrderPage;

