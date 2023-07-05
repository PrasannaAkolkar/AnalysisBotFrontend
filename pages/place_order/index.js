import React, { useState } from 'react';
import styles from '../../styles/PlaceOrderPage.module.css';
import OptionChain from '@/components/OptionChain';
import { GET_OPTION_CHAIN, GET_QUOTE_API } from '@/utils/apiLinks';

const stocks = ['TATASTEEL', 'RELIANCE', 'INFY', 'HDFCBANK', 'ICICIBANK', 'HINDUNILVR', 'TCS', 'WIPRO', 'AXISBANK', 'SBI'];

const PlaceOrderPage = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [optionChainLoaded, setOptionChainLoaded] = useState(false);
  const [callOptionArray, setCallOptionArray] = useState([]);
  const [putOptionArray, setPutOptionArray] = useState([]);

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

  const handleLoadOptionChain = async () => {
    try {
      const response = await fetch(GET_OPTION_CHAIN);
      const data = await response.json();
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
      <h1 className={styles.title}>Place Order</h1>
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
                    .filter((stock) => stock.toUpperCase().includes(selectedStock.toUpperCase()))
                    .map((stock) => (
                      <li key={stock} onClick={() => handleStockSelection(stock)}>
                        {stock}</li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="instrument" className={styles.label}>
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
            </select>
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
        {/* <div>
        <OptionChain callPayload={callOptionArray} putPayload={putOptionArray} />
        </div> */}
        
      </div>


    </div>
  );
};
export default PlaceOrderPage;

