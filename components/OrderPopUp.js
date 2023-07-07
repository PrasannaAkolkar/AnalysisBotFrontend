import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  closeButton: {
    color: theme.palette.common.white,
    cursor: 'pointer',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    // marginLeft:"20px"
  },
  infoIcon: {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  infoIconright: {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    marginLeft:'auto'
  },
  infoText: {
    display: 'flex',
    flexDirection: 'row',
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

const OrderPopUp = ({
  stockName,
  lastTradedPrice,
  lastTradedDate,
  high,
  low,
  open,
  prevClose,
  exchange_code,
  totalTradedQuantity,
  openPop,
  handleClose,
}) => {
  const classes = useStyles();

  const handlePopUpClose = () => {
    handleClose();
  };

  return (
    <Dialog open={openPop} onClose={handlePopUpClose} maxWidth="sm" fullWidth>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <span>{stockName}</span>
        <Close className={classes.closeButton} onClick={handlePopUpClose} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className={classes.infoRow}>
            <div className={classes.infoIcon}>
              <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Last Traded Price: </p>
              <p className="info-value"> {lastTradedPrice}</p>
            </div>
            <div className={classes.infoIconright}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Last Traded Date :</p>
              <p className="info-value">{lastTradedDate}</p>
            </div>
          </div>
          
          <div className={classes.infoRow}>
            <div className={classes.infoIcon}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">High: </p>
              <p className="info-value">{high}</p>
            </div>
            <div className={classes.infoIconright}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Low: </p>
              <p className="info-value">{low}</p>
            </div>
          </div>
          
          <div className={classes.infoRow}>
            <div className={classes.infoIcon}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Open: </p>
              <p className="info-value">{open}</p>
            </div>
            <div className={classes.infoIconright}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Prev Close: </p>
              <p className="info-value">{prevClose}</p>
            </div>
          </div>
          
          <div className={classes.infoRow}>
            <div className={classes.infoIcon}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Exchange</p>
              <p className="info-value">{exchange_code}</p>
            </div>
            <div className={classes.infoIconright}>
            <img src="high-priority.svg" alt="Last Traded Price" style={{width:"20px","height":"20px"}}/>
            </div>
            <div className={classes.infoText}>
              <p className="info-label">Total Traded Quantity</p>
              <p className="info-value">{totalTradedQuantity}</p>
            </div>
          </div>
        
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className={classes.buyButton} onClick={handlePopUpClose}>
          Buy
        </Button>
        <Button className={classes.sellButton} onClick={handlePopUpClose}>
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderPopUp;
