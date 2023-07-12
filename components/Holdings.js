import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '150%',
    marginTop: theme.spacing(3),
    // overflowX: 'auto'
  },
  table: {
    // minWidth: 650,
  },
}));

const PortfolioTable = (portfolioPositions) => {
  const classes = useStyles();
  const portfolioHoldingsData = []
  const portfolioPositionsData = []

  console.log("x ppd", (portfolioPositions?.portfolioPositions))
  try{
  for (let i = 0; i < (portfolioPositions?.portfolioPositions[0])?.length; i++) {
    let stockPayload = {
      stockCode: portfolioPositions.portfolioPositions[i].stock_code,
      entryPrice: Number(portfolioPositions.portfolioPositions[i].average_price),
      currentProfitLoss: (Math.round(Number(portfolioPositions.portfolioPositions[i].ltp) - Number(portfolioPositions.portfolioPositions[i].average_price))) * Number(portfolioPositions.portfolioPositions[i].quantity),
      settlementId: portfolioPositions.portfolioPositions[i].settlement_id,
      // action:  portfolioPositions.portfolioPositions[i].action
    }

    portfolioPositionsData.push(stockPayload)
  }
  console.log("position length" , portfolioPositions?.portfolioPositions[1]?.length)
  for (let i = 0; i < (portfolioPositions?.portfolioPositions[1])?.length; i++) {
    console.log("position inside" , portfolioPositions.portfolioPositions[1][i].average_price)
    let stockPayload = {
      stockCode: portfolioPositions.portfolioPositions[1][i].stock_code,
      entryPrice: Number(portfolioPositions.portfolioPositions[1][i].average_price),
      currentProfitLoss: (Math.round(Number(portfolioPositions.portfolioPositions[1][i].current_market_price) - Number(portfolioPositions.portfolioPositions[1][i].average_price))) * Number(portfolioPositions.portfolioPositions[1][i].quantity),
      // action:  (portfolioPositions.portfolioPositions[i][1].action) ?  (portfolioPositions.portfolioPositions[i][1].action) :""
    }
    console.log("positions payload" , stockPayload)
    portfolioHoldingsData.push(stockPayload)
  }
}catch(error){
  console.log("Unable to fetch data")
}

  return (
    <div className={classes.root}>
      <Paper style={{ width: "100%", border: "1px black" }}>
        <Table className={classes.table} style={{ width: "30px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Stock Code</TableCell>
              <TableCell>Entry Price</TableCell>
              <TableCell>Current Profit/Loss</TableCell>
              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <strong>Portfolio Holdings</strong>
              </TableCell>
            </TableRow>
            {portfolioHoldingsData.map((row) => (
              <TableRow key={row.settlementId} >
                <TableCell style={{textAlign:"center"}}>{row.stockCode}</TableCell>
                <TableCell style={{textAlign:"center"}}>{row.entryPrice}</TableCell>
                <TableCell style={{textAlign:"center"}}>{row.currentProfitLoss}</TableCell>
                {/* <TableCell style={{textAlign:"center"}}>{row.action}</TableCell> */}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="center">
                <strong>Portfolio Positions</strong>
              </TableCell>
            </TableRow>
            {portfolioPositionsData.map((row) => (
              <TableRow key={row.settlementId}>
                <TableCell style={{textAlign:"center"}}>{row.stockCode}</TableCell>
                <TableCell style={{textAlign:"center"}}>{row.entryPrice}</TableCell>
                <TableCell style={{textAlign:"center"}}>{row.currentProfitLoss}</TableCell>
                {/* <TableCell style={{textAlign:"center"}}>{row.action}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default PortfolioTable;
