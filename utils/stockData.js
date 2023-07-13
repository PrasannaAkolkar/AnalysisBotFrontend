import { stocks_names_breeze } from './stock_names';
import { GET_OPTION_CHAIN, GET_QUOTE_API, GET_TA_DATA, GET_HISTORICAL_DATA, GET_PORTFOLIO_POSITIONS } from '@/utils/apiLinks';

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

export async function fetchStockData(selectedStock) {

    const response = await fetch(GET_QUOTE_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stock_code: getKeyByValue(stocks_names_breeze[0], selectedStock),
        }),
    });
    const data = await response.json()
    
    return data
}
export async function fetchStockTAData(selectedStock){
    const response = await fetch(GET_TA_DATA, {
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

    return data
  }
  export async function fetchStockHistoricalData(selectedStock) {
    console.log("price  " , selectedStock)
    const response = await fetch(GET_HISTORICAL_DATA, {
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
    console.log("price stock" , priceDate)
    return priceDate
  }

  export async function fetchStockPositions() {
    const response = await fetch(GET_PORTFOLIO_POSITIONS)
    const data = await response.json();
    console.log("positions"  , data)
    return data
  }

  export const fetchStockOptionChain = async (selectedStock, selectedDateExpiry) => {
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
      console.log("price data is", data)
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

    return [filteredCallPayload, filteredPutPayload]

    } catch (error) {
      console.error('Error loading option chain:', error);
    }
  };