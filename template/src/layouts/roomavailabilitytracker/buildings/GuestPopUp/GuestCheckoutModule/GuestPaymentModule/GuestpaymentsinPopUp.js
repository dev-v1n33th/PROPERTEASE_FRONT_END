import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import axios from "../../../../../../Uri";
import { Container, Grid, InputLabel } from "@mui/material";

import { makeStyles } from "@mui/styles";
import MDTypography from "components/MDTypography";

import Textfield from "layouts/profile/GuestLoginForm/components/TextField";
import Select from "layouts/profile/GuestLoginForm/components/Select";
import Purpose from "./Purpose";

import Button from "layouts/profile/GuestLoginForm/components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop,CircularProgress } from "@mui/material";
import "./GuestPaymentsinPopUp.css";

const useStyles = makeStyles({
  root: {
    height: 40,
  },
  size: {
    width: 40,
    height: 30,
  },
  gap: {
    paddingLeft: 20,
    height: 100,
  },
});

const FORM_VALIDATION = Yup.object().shape({
  paymentPurpose: Yup.string().required("Required"),
  amountPaid: Yup.number().required("Required").test(

    'Is positive?',

    'ERROR: The Amount must be greater than 0!',

    (value) => value > 0

  ),
  transactionId:Yup.string().test(
    'len',
    'can be empty or with string at least 10 characters and not more than 30',
    (val) => {
        if (val == undefined) {
            return true;
        }
        return  ((val.length == 0 || (val.length >= 10 && val.length <= 30)))
    }
).required("Required"),
});
const notify = () => toast();

const GuestpaymentsinPopUp = (props) => {



  const [disableButtons, setDisableButtons] = React.useState(false);

  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let userId = userData.data.userId
  console.log(userId)

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  var GuestOccupancyType = props.guestdetails.occupancyType;
  var buildingId = props.guestdetails.buildingId;
  var GuestID = props.guestdetails.id;
  var INITIAL_FORM_STATE = {
    paymentPurpose: "",
    amountPaid: "",
    transactionId: "",
    guestId: GuestID,
    createdBy : userId,
    occupancyType : GuestOccupancyType,
    buildingId:buildingId
  };

  const classes = useStyles();

  return (
    // <div className="record-payment">
 <Grid container>
 <Grid item xs={12}><MDTypography gutterBottom><h5 className='head-1-checkOut' >Clear Due amount</h5></MDTypography></Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION} 
              onSubmit={async (guest, { resetForm }) => {
                console.log(guest);
                handleToggle();


                const res = await axios.post("/payment/addAfterOnBoard", guest)
                
                .catch((err) => {
                  toast.error("Server error");
                });
                console.log(res.data);
               
                if(res.data!==null){
                  handleClose()
                  toast.success("Payment Recorded Successfully");
                
                }

                       
              
                setTimeout(() => {
                  try{
                    resetForm();

                  }
                  catch{
                    console.log("error")
                  }
                 
                }, 50);
              }}
            >
              {(formProps) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Textfield name="amountPaid" label="Amount Paid" />
                    </Grid>
                    <Grid item xs={6}>
                      <Textfield name="transactionId" label="Transaction ID" />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">
                        &nbsp; Payment Purpose
                      </InputLabel>

                      <Select
                        // IconComponent={(Purpose) => (
                        //   <ArrowDropDownIcon className={classes.size} />
                        // )}
                        name = "paymentPurpose"
                        options = {Purpose}
                        className={classes.root}
                      />
                    </Grid>

                    <Grid item xs={6} sx={{ marginTop: 2 }}>
                      <Button  disabled={disableButtons} onClick={()=>{setDisableButtons(true)}}>Record Payment</Button>
                    </Grid>
                  </Grid>
                  <ToastContainer  maxWidth="sx"
               position="top-right"
               autoClose={3000}
               type="toast.TYPE.SUCCESS"
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               />
                </Form>
              )}
            </Formik>
          </div>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </Container>
      </Grid>
    </Grid>

    // </div>
      );
};

export default GuestpaymentsinPopUp;