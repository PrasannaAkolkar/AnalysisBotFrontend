import React, { useEffect, useState } from 'react';
import styles from '../../styles/MarketAnalysis.module.css';
import { stocks_names_breeze } from '@/utils/stock_names';
import LineChart from '@/components/LineStickChart';
import { fetchStockHistoricalData, fetchStockTAData } from '@/utils/stockData';

const stock_names = Object.values(stocks_names_breeze[0]);
const stocks = stock_names;

const MarketAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState('NIFTY');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setShowAutocomplete(false);
  };
  const [taData, setTaData] = useState({})
  const [historicalData, setHistoricalData] = useState([])
  const [available, setAvailable] = useState(false)

  async function fetchHistoricalData() {
    setHistoricalData(await fetchStockHistoricalData(selectedStock))
    console.log("Price TA Historical", historicalData)
  }
  async function fetchTAData() {
    const data = await fetchStockTAData(selectedStock)
    setTaData(data)
    console.log("Price TA data ", taData)
  }

  useEffect(() => {
    fetchHistoricalData()
    fetchTAData()
  }, [selectedStock]);

  const gridData = [
    {
      icon: 'volume.png',
      text: 'Average Volume',
      value: taData?.volume_comparison,
    },
    {
      icon: 'trending-up.svg',
      text: 'Trend',
      value: taData?.trend,
    },
    {
      icon: 'stoch.webp',
      text: 'Stochastic',
      value: taData?.stoch,
    },
    {
      icon: 'rsi.webp',
      text: 'RSI',
      value: taData?.rsi,
    },
    {
      icon: 'ema3.png',
      text: '200 EMA',
      value: taData?.ema,
    },
    {
      icon: 'overbought.png',
      text: 'Buy/Sell Pressure',
      value: taData?.rsi_trend,
    },
    {
      icon: 'div2.webp',
      text: 'Divergence',
      value: taData?.divergence,
    },
    {
      icon: 'volatility2.png',
      text: 'Volatility',
      value: taData?.volatility_comparison
      ,
    },
  ];

  return (
    <div className={styles.container}>

      <img
        src="market_analysis.svg.svg"
        alt="Analyser Image"
        className={styles.analyserImage}
      />
      <h1 className={styles.title}>Analyser</h1>
      <div className={styles.autocomplete}>
        <label htmlFor="stock" className={styles.autocompleteLabel}>
          Choose your stock
        </label>
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
              .filter(
                (stock, index, self) =>
                  self.findIndex(
                    (s) => s.toLowerCase() === stock.toLowerCase()
                  ) === index
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
      <LineChart data={historicalData} width={1000} height={300}/>
      <div className={styles.gridContainer}>
        {gridData.map((data, index) => (
          <div className={styles.gridItem} key={index}>
            <img
              src={data.icon}
              alt="Grid Icon"
              className={styles.gridIcon}
            />
            <p className={styles.gridText}>{data.text}</p>
            <p className={styles.gridValue}>{data.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketAnalysis;
