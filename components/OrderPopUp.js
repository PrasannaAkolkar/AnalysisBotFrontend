import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    cursor: 'pointer',
  },
  infoIcon: {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  buyButton: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  sellButton: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const OrderPopUp = ({ stockName, lastTradedPrice, lastTradedDate, high, low, open, prevClose, productType, totalTradedQuantity }) => {
  const classes = useStyles();
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpen = () => {
    setOpenPopUp(true);
  };

  const handleClose = () => {
    setOpenPopUp(false);
  };

  return (
    <>
      <button onClick={handleOpen}>Open PopUp</button>
      <Dialog open={openPopUp} onClose={handleClose} aria-labelledby="order-popup-title" maxWidth="sm" fullWidth>
        <DialogTitle id="order-popup-title">
          {stockName}
          <span className={classes.closeButton} onClick={handleClose}>
            &times;
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="last_traded_price_icon.png" alt="Last Traded Price" />
              </div>
              <div className={classes.infoText}>
                <p>Last Traded Price:</p>
                <p>{lastTradedPrice}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="last_traded_date_icon.png" alt="Last Traded Date" />
              </div>
              <div className={classes.infoText}>
                <p>Last Traded Date:</p>
                <p>{lastTradedDate}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="high_icon.png" alt="High" />
              </div>
              <div className={classes.infoText}>
                <p>High:</p>
                <p>{high}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="low_icon.png" alt="Low" />
              </div>
              <div className={classes.infoText}>
                <p>Low:</p>
                <p>{low}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="open_icon.png" alt="Open" />
              </div>
              <div className={classes.infoText}>
                <p>Open:</p>
                <p>{open}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="prev_close_icon.png" alt="Previous Close" />
              </div>
              <div className={classes.infoText}>
                <p>Prev Close:</p>
                <p>{prevClose}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="product_type_icon.png" alt="Product Type" />
              </div>
              <div className={classes.infoText}>
                <p>Product Type:</p>
                <p>{productType}</p>
              </div>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.infoIcon}>
                <img src="total_traded_quantity_icon.png" alt="Total Traded Quantity" />
              </div>
              <div className={classes.infoText}>
                <p>Total Traded Quantity:</p>
                <p>{totalTradedQuantity}</p>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.buyButton} onClick={handleClose}>
            Buy
          </Button>
          <Button className={classes.sellButton} onClick={handleClose}>
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderPopUp;
