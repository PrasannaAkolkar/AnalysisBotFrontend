import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  const [tradeData, setTradeData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getdetails');
        const data = await response.json();
        setTradeData(data)
        console.log("data is" , data)
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchData();
  }, []);

  return (
  <>
  <Dashboard data={tradeData}></Dashboard>
  </>
  );
};

export default DashboardPage;
