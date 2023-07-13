import React, { useState } from 'react';
import styles from '../../styles/MarketAnalysis.module.css';
import { stocks_names_breeze } from '@/utils/stock_names';
import LineChart from '@/components/LineStickChart';

const stock_names = Object.values(stocks_names_breeze[0]);
const stocks = stock_names;

const MarketAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState('NIFTY');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
    setShowAutocomplete(false);
  };

  const gridData = [
    {
      icon: 'volume.png',
      text: 'Volume',
      value: '1234', // Replace with the actual value for Volume
    },
    {
      icon: 'trending-up.svg',
      text: 'Trend',
      value: 'Up', // Replace with the actual value for Trend
    },
    {
      icon: 'stoch.webp',
      text: 'Stochastic',
      value: '85', // Replace with the actual value for Stochastic
    },
    {
      icon: 'rsi.webp',
      text: 'RSI',
      value: '70', // Replace with the actual value for RSI
    },
    {
      icon: 'ema3.png',
      text: 'EMA',
      value: '50', // Replace with the actual value for EMA
    },
    {
      icon: 'overbought.png',
      text: 'Overbought',
      value: 'Yes', // Replace with the actual value for Overbought
    },
    {
      icon: 'overbought.png',
      text: 'Oversold',
      value: 'No', // Replace with the actual value for Oversold
    },
    {
      icon: 'volatility2.png',
      text: 'Volatility',
      value: 'High', // Replace with the actual value for Volatility
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analyser</h1>
      <img
        src="market_analysis.svg.svg"
        alt="Analyser Image"
        className={styles.analyserImage}
      />
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
