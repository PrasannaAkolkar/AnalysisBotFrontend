import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';


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
        setSelectedDateFromBacktest(date)
    }

    const handleDateChangeToBacktest = (date) => {
        setSelectedDateToBacktest(date)
    }



    const handleDownloadTradeClick = async () => {
        
        const response = await fetch('http://localhost:5000/snapshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start_date: selectedDateFrom,
                end_date: selectedDateTo,
            }),
        });
        setShowDataButton(true)
    }

    const handleShowTradeClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/getdetails');
            data = await response.json();
            console.log("final data is", data)
            setShowDataButton(true)
            router.reload();
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    }

    const testHammerStrategy = async () => {
        const response = await fetch('http://localhost:5000/testall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start_date: selectedDateFromBacktest,
                end_date: selectedDateToBacktest,
            }),
        });
    }

    return (
        <>
            <div className={styles.containerbutton}>
                <div className={styles.snapshot}>
                    <button className={styles.downloadButton} onClick={handleDownloadTradeClick}> Download Trade Data</button>
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
                <button className={styles.testHammer} onClick={testHammerStrategy}> Backtest Hammer Strategy</button>
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
                </div>

                
                

                {showDataButton && <button className={styles.showtradedatabutton} onClick={handleShowTradeClick}> Show Data</button>}
            </div>

            <div className={styles.container}>

                <h2>Supports and Resistances</h2>
                {Object.keys(data).map((key) => (

                    <div key={key} className={styles.dataItem}>
                        <hr></hr>
                        <h3>{data[key].company}</h3>
                        <div className={styles.tableSection}>
                            <h4>Support</h4>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>SL</th>
                                        <th>Final Target</th>
                                        <th>Gap</th>
                                        <th>Low Value</th>
                                        <th>Target 1</th>
                                        <th>Target 2</th>
                                        <th>Target 3</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(data[key].support).map((supportKey) => (
                                        <tr key={supportKey}>
                                            <td>{supportKey}</td>
                                            <td>{data[key].support[supportKey].SL || '-'}</td>
                                            <td>{data[key].support[supportKey]['final target'] || '-'}</td>
                                            <td>{data[key].support[supportKey].gap || '-'}</td>
                                            <td>{data[key].support[supportKey]['low_value'] || '-'}</td>
                                            <td>{data[key].support[supportKey]['target 1'] || '-'}</td>
                                            <td>{data[key].support[supportKey]['target 2'] || '-'}</td>
                                            <td>{data[key].support[supportKey]['target 3'] || '-'}</td>
                                            <td>{data[key].support[supportKey].value || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.tableSection}>
                            <h4>Resistance</h4>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>SL</th>
                                        <th>Final Target</th>
                                        <th>Gap</th>
                                        <th>High Value</th>
                                        <th>Target 1</th>
                                        <th>Target 2</th>
                                        <th>Target 3</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(data[key].resistance).map((resistanceKey) => (
                                        <tr key={resistanceKey}>
                                            <td>{resistanceKey}</td>
                                            <td>{data[key].resistance[resistanceKey].SL || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey]['final target'] || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey].gap || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey]['high_value'] || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey]['target 1'] || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey]['target 2'] || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey]['target 3'] || '-'}</td>
                                            <td>{data[key].resistance[resistanceKey].value || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div></>

    );
};

export default Dashboard;
