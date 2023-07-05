import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import AuthRoute from '@/components/AuthRoute';
import { GET_STOCK_DETAILS_HAMMER_API } from '@/utils/apiLinks';

const DashboardPage = () => {
  const [tradeData, setTradeData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GET_STOCK_DETAILS_HAMMER_API);
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
  <AuthRoute>
  <Dashboard data={tradeData}></Dashboard>
  </AuthRoute>
  );
};

export default DashboardPage;
