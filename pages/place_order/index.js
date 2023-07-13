import React, { useEffect, useState } from 'react';
import styles from '../../styles/PlaceOrderPage.module.css';
import OptionChain from '@/components/OptionChain';
// import { convertToKeyValue } from '@/utils/stock_names';
import { stocks_names_breeze } from '@/utils/stock_names';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OrderPopUp from '@/components/OrderPopUp';
import PortfolioTable from '@/components/Holdings';
const stock_names = (Object.values(stocks_names_breeze[0]))
const stocks = stock_names
import LineChart from '@/components/LineStickChart';
import { fetchStockData, fetchStockHistoricalData, fetchStockTAData, fetchStockPositions, fetchStockOptionChain } from '@/utils/stockData';
const PlaceOrderPage = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY');
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
    // try {
    //   const response = await fetch(GET_QUOTE_API, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
    //     }),
    //   });
    //   const data = await response.json();

    //   setStockPriceObj(data);
    // } catch (error) {
    //   console.error('Error refreshing data:', error);
    // }
    setStockPriceObj(await fetchStockData(selectedStock));
  };

  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setShowAutocomplete(false);
  };
  async function fetchPositions() {
    const data = await fetchStockPositions()
    setPortfolioPositions([data[0]?.Success,data[1]?.Success])
  }
  async function fetchData() {
    setStockPriceObj(await fetchStockData(selectedStock))
  }
  async function fetchTAData(){
    const data = await fetchStockTAData(selectedStock)
    console.log("Price TA data " , data)
  }
  async function fetchHistoricalData() {
    setHistoricalData(await fetchStockHistoricalData(selectedStock))
  }

  useEffect(() => {
    fetchData();
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
    try{
      const optionChainData = await fetchStockOptionChain(selectedStock,selectedDateExpiry)
      setCallOptionArray(optionChainData[0]);
      setPutOptionArray(optionChainData[1]);
    }catch(err){
      console.log("error fetching option data")
    }
  };
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

