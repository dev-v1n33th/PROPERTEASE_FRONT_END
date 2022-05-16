import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
// import { borderRadius } from "@mui/system";
// import { Link } from "react-router-dom";
// import RecentTransactions from "layouts/dashboard/components/summaryTables/Recenttransactions";
import TransactionHistory from "./TransactionHistoryModule/TransactionHistory";
// import RecordpaymentsinPopUp from "./GuestPaymentModule/GuestpaymentsinPopUp";
import Guestdetails from "./GuestDetails/DOMguestdetails/guestdetails";
import GuestDetailsIndex from "./GuestDetails";
// import AppBar from "@mui/material/AppBar";
import CheckOut from "./GuestCheckoutModule/CheckOut";
import "./GuestPopUp.css";
import AppBar from '@mui/material/AppBar';


export default function GuestPopUp({ open, handleClose, ...props }) {
  console.log('heeeeeeeeeeeeeee')
  console.log(props.TotalAmountByGuest)
  return (
    <div>
      {props.GuestDetails.occupancyType === "regular" ? (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
           <AppBar position="static"
            width="100%"
            variant="contained"
            color="error"
            size="large"
            justify="center"
            style={{ borderRadius: 0 }}
          >
            Guest Details
          </AppBar>
          <DialogContent>
            <GuestDetailsIndex
              guestdetails={props.GuestDetails}
              GuestDueAmount={props.GuestDueAmount}
              TotalAmountByGuest={props.TotalAmountByGuest}
            />
            <br />

            <CheckOut
              guestdetails={props.GuestDetails}
              GuestDueAmount={props.GuestDueAmount}
            />
            <br />

            <br />
            {/* <RecordpaymentsinPopUp guestdetails={props.GuestDetails} /> */}
            <DialogTitle>
              <br />
              <h3 className="head-1-checkOut">Transaction History</h3>
            </DialogTitle>
            <TransactionHistory guestdetails={props.GuestDetails} />
          </DialogContent>
          <DialogActions>
            <Grid container style={{ display: "flex" }}>
              <Grid item xs={6}>
                <MDButton
                  width="20%"
                  variant="contained"
                  color="info"
                  size="large"
                  justify="center"
                  style={{ borderRadius: 10 }}
                  onClick={handleClose}
                >
                  Close
                </MDButton>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <MDButton
            width="20%"
            variant="contained"
            color="info"
            size="large"
            justify="center"
            style={{ borderRadius: 0 }}
          >
            Guest Details
          </MDButton>
          <DialogContent>
            <GuestDetailsIndex
              guestdetails={props.GuestDetails}
              GuestDueAmount={props.GuestDueAmount}
              TotalAmountByGuest={props.TotalAmountByGuest}
            />
            <br />

            <CheckOut
              guestdetails={props.GuestDetails}
              GuestDueAmount={props.GuestDueAmount}
            />
            <br />

            <br />
            <h3 className="head-1-checkOut">Transaction History</h3>
            <br />
            <TransactionHistory guestdetails={props.GuestDetails} />
          </DialogContent>
          <DialogActions>
            <Grid container style={{ display: "flex" }}>
              <Grid item xs={6}>
                <MDButton
                  width="20%"
                  variant="contained"
                  color="info"
                  size="large"
                  justify="center"
                  style={{ borderRadius: 10 }}
                  onClick={handleClose}
                >
                  Close
                </MDButton>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
