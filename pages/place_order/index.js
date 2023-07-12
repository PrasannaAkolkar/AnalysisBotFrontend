import React, { useEffect, useState } from 'react';
import styles from '../../styles/PlaceOrderPage.module.css';
import OptionChain from '@/components/OptionChain';
import { GET_OPTION_CHAIN, GET_QUOTE_API } from '@/utils/apiLinks';
// import { convertToKeyValue } from '@/utils/stock_names';
import { stocks_names_breeze } from '@/utils/stock_names';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OrderPopUp from '@/components/OrderPopUp';
import PortfolioTable from '@/components/Holdings';
const stock_names = (Object.values(stocks_names_breeze[0]))
const stocks = stock_names
import LineChart from '@/components/LineStickChart';

const PlaceOrderPage = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY');
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [callOptionArray, setCallOptionArray] = useState([]);
  const [putOptionArray, setPutOptionArray] = useState([]);
  const [selectedDateExpiry, setSelectedDateExpiry] = useState(null);
  const [stockPriceObj, setStockPriceObj] = useState(null)
  let [portfolioPositions, setPortfolioPositions] = useState(null)
  const [historicalData, setHistoricalData] = useState([
    { date: '2022-01-01', price: 50 },
    { date: '2022-01-02', price: 55 },
    { date: '2022-01-03', price: 34 },
    { date: '2022-01-04', price: 21 },
    { date: '2022-01-05', price: 100 },
    { date: '2022-01-06', price: 50 },
    { date: '2022-01-07', price: 55 },
    { date: '2022-01-08', price: 34 },
    { date: '2022-01-09', price: 21 },
    { date: '2022-01-10', price: 100 },
  ])

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  const handleRefreshData = async () => {
    try {
      const response = await fetch(GET_QUOTE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
        }),
      });
      const data = await response.json();

      setStockPriceObj(data);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setShowAutocomplete(false);
  };

  async function fetchPositions() {
    const response = await fetch('http://localhost:5000/portfolio-positions')
    const data = await response.json();
    console.log("positions"  , data)
    setPortfolioPositions([data[0]?.Success,data[1]?.Success])
  }
  async function fetchData() {

    const response = await fetch(GET_QUOTE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
      }),
    });
    const data = await response.json();
    setStockPriceObj(data)
  }
  async function fetchTAData(){
    const response = await fetch("http://localhost:5000/ta-data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
      }),
    });
    const data = await response.json();
    console.log("data ta is" , data)
  }
  async function fetchHistoricalData() {

    const response = await fetch("http://localhost:5000/historical-data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
      }),
    });
    const data = await response.json();
    console.log("x data is", data?.Success)
    let priceDate = []
    const historicalDataList = data?.Success
    for(let i=0;i<historicalDataList?.length;i++){
      let payload = {
        "price": historicalDataList[i].close,
        "date": historicalDataList[i].datetime
      }
      priceDate.push(payload)
    }
    
    setHistoricalData(priceDate)

  }

  useEffect(() => {
    fetchData();
    // fetchPositions()
    fetchHistoricalData()

  }, [selectedStock]);

  const handleOpenPopUp = async () => {
    console.log("inside popup")
    fetchData();
    console.log("here")
    setOpenPopUp(true);
  };
  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleGetActivePositions = async () => {
    await fetchPositions()
    await fetchTAData()
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

    } catch (error) {
      console.error('Error loading option chain:', error);
    }
  };

  // const stockData = [
  //   { date: '2022-01-01', price: 50 },
  //   { date: '2022-01-02', price: 55 },
  //   { date: '2022-01-03', price: 34 },
  //   { date: '2022-01-04', price: 21 },
  //   { date: '2022-01-05', price: 100 },
  //   { date: '2022-01-06', price: 50 },
  //   { date: '2022-01-07', price: 55 },
  //   { date: '2022-01-08', price: 34 },
  //   { date: '2022-01-09', price: 21 },
  //   { date: '2022-01-10', price: 100 },
  // ];

  return (
    <div className={styles.container}>

      {openPopUp && <OrderPopUp openPop={openPopUp}
        handleClose={handleClosePopUp}
        stockName={stockPriceObj?.Success?.[0]?.stock_code || ""}
        lastTradedPrice={stockPriceObj?.Success?.[0]?.ltp || ""}
        lastTradedDate={stockPriceObj?.Success?.[0]?.ltt?.split(' ')[0] || ""}
        high={stockPriceObj?.Success?.[0]?.high || ""}
        low={stockPriceObj?.Success?.[0]?.low || ""}
        open={stockPriceObj?.Success?.[0]?.open || ""}
        bestBidPrice={stockPriceObj?.Success?.[0]?.best_bid_price || ""}
        exchange_code={stockPriceObj?.Success?.[0]?.exchange_code || ""}
        totalTradedQuantity={stockPriceObj?.Success?.[0]?.total_quantity_traded || ""}
        handleRefreshData={handleRefreshData}
      />}
      <div style={{ display: "flex" }}>
        <img src="place_order.jpg" style={{ width: "250px", "height": "150px", display: "flex", margin: "auto", marginBottom: "2%" }} ></img>
      </div>

      <h1 className={styles.title}>Lets Trade!</h1>
      <div style={{ display: 'flex', marginTop: "5%" }}>
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
          </div>
          <div className={styles.autocomplete}>
            <label htmlFor="instrument" className={styles.label}>
              Expiry (Only for Options):
            </label>
            <DatePicker
              selected={selectedDateExpiry}
              onChange={handleDateChangeFrom}
              dateFormat="yyyy-MM-dd"
              filterDate={filterDatePicker}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.placeOrderButton} onClick={handleOpenPopUp}>
              Place Order
            </button>
            <button className={styles.getPositionsButton} onClick={handleGetActivePositions}>
              Fetch Holdings
            </button>
            <button className={styles.loadOptionChainButton} onClick={handleLoadOptionChain}>
              Load Option Chain
            </button>
          </div>
          <div>
            <u><h2 style={{marginTop:"5%"}}>{selectedStock}</h2></u>
            <LineChart data={historicalData} width={600} height={200}/>
          </div>
        </div>
        <div style={{ marginLeft: "10%", display: "flex" }}>

          <PortfolioTable portfolioPositions={portfolioPositions}></PortfolioTable>
          <div className={styles.optionChainContainer}>
            <OptionChain callPayload={callOptionArray} putPayload={putOptionArray} />
          </div>
        </div>


      </div>

    </div>
  );
};
export default PlaceOrderPage;

