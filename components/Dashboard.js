import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';
import { SNAPSHOT_API, DOWNLOAD_BACKTEST_HAMMER_CSV_API, GET_STOCK_DETAILS_HAMMER_API, BACKTEST_ALL_STOCKS_API } from '@/utils/apiLinks';

const Dashboard = ({ data }) => {
  const router = useRouter();
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [selectedDateFromBacktest, setSelectedDateFromBacktest] = useState(null);
  const [selectedDateToBacktest, setSelectedDateToBacktest] = useState(null);
  const [showDataButton, setShowDataButton] = useState(false);

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };

  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };

  const handleDateChangeFromBacktest = (date) => {
    setSelectedDateFromBacktest(date);
  };

  const handleDateChangeToBacktest = (date) => {
    setSelectedDateToBacktest(date);
  };

  const handleDownloadTradeClick = async () => {
    const response = await fetch(SNAPSHOT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_date: selectedDateFrom,
        end_date: selectedDateTo,
      }),
    });
    setShowDataButton(true);
  };

  const handleDownload = async () => {
    await fetch(DOWNLOAD_BACKTEST_HAMMER_CSV_API)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.csv'; // Specify the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log('Error downloading file:', error);
      });
  };

  const handleShowTradeClick = async () => {
    try {
      const response = await fetch(GET_STOCK_DETAILS_HAMMER_API);
      data = await response.json();
      console.log('final data is', data);
      setShowDataButton(true);
      router.reload();
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const testHammerStrategy = async () => {
    const response = await fetch(BACKTEST_ALL_STOCKS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_date: selectedDateFromBacktest,
        end_date: selectedDateToBacktest,
      }),
    });
  };

  return (
    <>

      <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
        <h1 style={{ textAlign: 'center' }}>Hammer Strategy</h1>
        <img src='hammer.svg' style={{ width: "100px" }}></img>
      </div>

      <div className={styles.containerbutton}>
        <div className={styles.snapshot}>
          <button className={styles.downloadButton} onClick={handleDownloadTradeClick}>
            Download Trade Data
          </button>
          <text className={styles.fromtodate}>From</text>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={selectedDateFrom}
              onChange={handleDateChangeFrom}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
            />
          </div>
          <text className={styles.fromtodate}>To</text>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={selectedDateTo}
              onChange={handleDateChangeTo}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
            />
          </div>
        </div>
        <div className={styles.snapshot}>
          <button className={styles.testHammer} onClick={testHammerStrategy}>
            Backtest Hammer Strategy
          </button>
          <text className={styles.fromtodate}>From</text>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={selectedDateFromBacktest}
              onChange={handleDateChangeFromBacktest}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
            />
          </div>
          <text className={styles.fromtodate}>To</text>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={selectedDateToBacktest}
              onChange={handleDateChangeToBacktest}
              dateFormat="yyyy-MM-dd"
              className={styles.datePicker}
            />
          </div>
          <button className={styles.downloadhammerfile} onClick={handleDownload}>
            Download
          </button>
        </div>
        {showDataButton && (
          <button className={styles.showtradedatabutton} onClick={handleShowTradeClick}>
            Show Data
          </button>
        )}
      </div>
      <div className={styles.container}>
        <h2>Supports and Resistances</h2>
        {Object.keys(data).map((key) => {
          const companyData = data[key];

          // Check if support and resistance data is present
          const hasSupport = Object.keys(companyData.support).length > 0;
          const hasResistance = Object.keys(companyData.resistance).length > 0;

          // Ignore if both support and resistance data are missing
          if (!hasSupport && !hasResistance) {
            return null;
          }

          return (
            <div key={key} className={styles.dataItem}>
              <hr />
              <h3>{companyData.company}</h3>

              {/* Render Support table if available */}
              {hasSupport && (
                <div className={styles.tableSection}>
                  <h4>Support</h4>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>SL</th>
                        <th>Final Target</th>
                        <th>Gap</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(companyData.support).map((supportKey) => (
                        <tr key={supportKey}>
                          <td>{supportKey}</td>
                          <td>{companyData.support[supportKey].SL || '-'}</td>
                          <td>{companyData.support[supportKey]['final target'] || '-'}</td>
                          <td>{companyData.support[supportKey].gap || '-'}</td>
                          <td>{companyData.support[supportKey].value || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Render Resistance table if available */}
              {hasResistance && (
                <div className={styles.tableSection}>
                  <h4>Resistance</h4>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>SL</th>
                        <th>Final Target</th>
                        <th>Gap</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(companyData.resistance).map((resistanceKey) => (
                        <tr key={resistanceKey}>
                          <td>{resistanceKey}</td>
                          <td>{companyData.resistance[resistanceKey].SL || '-'}</td>
                          <td>{companyData.resistance[resistanceKey]['final target'] || '-'}</td>
                          <td>{companyData.resistance[resistanceKey].gap || '-'}</td>
                          <td>{companyData.resistance[resistanceKey].value || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;