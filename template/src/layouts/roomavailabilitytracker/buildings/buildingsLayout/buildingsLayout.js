import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
// import buildingsData from './buildingsData';
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
// import IconButton from "@material-ui/core/IconButton";
// import { pink } from "@mui/material/colors";
// import MDTypography from "components/MDTypography";
// import TextField from "@mui/material/TextField";
// import Modal from "@mui/material/Modal";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import MDButton from "components/MDButton";
// import axios from 'axios';
import axios from "../../../../Uri";
import GuestPopUp from "../GuestPopUp/guestPopUP";
// import { setOpenConfigurator } from "context";
import "./buildingLayout.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

var GuestDetails = {};
var GuestDueAmount = null;
var TotalAmountByGuest = null;
var GuestId = null;

const BuildingsLayout = (props) => {
  // console.log(props.buildingId)
  const [buildingInfo, setBuildingInfo] = React.useState({});
  // const [buildingid , setbuildingid]= React.useState(1)

  const [loading, setLoading] = React.useState(false);
  const closeLoading = () => setLoading(!loading);
  // console.log(props.buildingId);


  const totalAmountPaidByGuest = async () => {
    await axios
      .get(`guest/getTotalPaid/${GuestId}`)
      .then((response) =>
        (TotalAmountByGuest = response.data)
      );
    console.log(
      TotalAmountByGuest
    );

  }

  useEffect(async () => {
    await axios

      .get(`/bed/getBedsByBuildingId/${props.buildingId}`)
      .then((res) => {
        setBuildingInfo(res.data);
        setLoading(true);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Server error");
        closeLoading();
      });
  }, [props.buildingId]);

  // const [GuestId, setGuestId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MDBox bgColor="white" padding="30px" sx={{ border: 3 }}>
        {loading ? (
          buildingInfo.map((post) => {
            return (
              <>
                <GuestPopUp

                  open={open}
                  handleClose={handleClose}
                  GuestDetails={GuestDetails}
                  GuestDueAmount={GuestDueAmount}
                  TotalAmountByGuest={TotalAmountByGuest}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {" "}
                    <h4 key={post.buildingName}>{post.buildingName}</h4>{" "}
                  </Grid>
                  {post.floors.map((item) => {
                    return (
                      <>
                        <Grid item xs={12}>
                          {" "}
                          <h6 key={item.floorName} align="center">
                            {item.floorName}
                          </h6>
                        </Grid>
                        {item.rooms.map((rmno) => {
                          return (
                            <>
                              <Grid item xs={3}>
                                <Grid
                                  spacing={-3}
                                  container
                                  rowSpacing={1}
                                  sx={{ border: 1, pl: 1 }}
                                >
                                  <Grid item xs={12}>
                                    <h5 key={rmno.roomNumber}>
                                      {rmno.roomNumber}
                                    </h5>
                                  </Grid>
                                  {rmno.beds.map((bdno) => {
                                    return (
                                      <>
                                        <Grid item xs>
                                          <Grid container rowSpacing={1}>
                                            <Grid item xs={12} align="center">
                                              {(() => {
                                                if (bdno.bedStatus === true) {
                                                  return (
                                                    <HotelOutlinedIcon
                                                      key={bdno.bedId}
                                                      className="click"
                                                      color="success"
                                                    />
                                                  );
                                                }
                                                else if (bdno.guestStatus == "InNotice") {

                                                  return (
                                                    <Tooltip
                                                      title={bdno.guestName}
                                                    >
                                                      <HotelOutlinedIcon
                                                        key={bdno.bedId}
                                                        color="warning"
                                                        className="click"
                                                        id={bdno.guestId}
                                                        onClick={async () => {
                                                          setLoading(false);
                                                          GuestId = bdno.guestId
                                                          console.log(
                                                            bdno.guestId
                                                          );
                                                          // totalAmountPaidByGuest()

                                                          await axios
                                                            .get(`guest/getTotalPaid/${bdno.guestId}`)
                                                            .then((response) =>
                                                              (TotalAmountByGuest = response.data)
                                                            );
                                                          console.log(
                                                            TotalAmountByGuest
                                                          );

                                                          await axios
                                                            .get(
                                                              `guest/onClickDues/${bdno.guestId}`
                                                            )
                                                            .then(
                                                              (response) =>
                                                              (GuestDueAmount =
                                                                response.data)
                                                            );
                                                          console.log(
                                                            GuestDueAmount
                                                          );

                                                          await axios
                                                            .get(
                                                              `/guest/getGuestByGuestId/${bdno.guestId}`
                                                            )
                                                            .then((res) => {
                                                              GuestDetails =
                                                                res.data;
                                                              console.log(
                                                                GuestDetails
                                                              );

                                                              setOpen(true);
                                                              setLoading(true);
                                                            })
                                                            .catch((err) => {
                                                              console.log(err);
                                                            });

                                                          // await axios .get(`guest/getPendingAndCompletedById/${bdno.guestId}`)
                                                          // .then((res) => {
                                                          //   GuestDueAmount = res.data;
                                                          //   console.log(GuestDueAmount)

                                                          // })
                                                        }}
                                                      />
                                                    </Tooltip>
                                                  );
                                                }
                                                else {
                                                  return (
                                                    <Tooltip
                                                      title={bdno.guestName}
                                                    >
                                                      <HotelOutlinedIcon
                                                        key={bdno.bedId}
                                                        color="error"
                                                        className="click"
                                                        id={bdno.guestId}
                                                        onClick={async () => {
                                                          setLoading(false);
                                                          console.log(
                                                            bdno.guestId
                                                          );
                                                          // totalAmountPaidByGuest

                                                          await axios
                                                            .get(`guest/getTotalPaid/${bdno.guestId}`)
                                                            .then((response) =>
                                                              (TotalAmountByGuest = response.data)
                                                            );
                                                          console.log(
                                                            TotalAmountByGuest
                                                          );
                                                          await axios
                                                            .get(
                                                              `guest/onClickDues/${bdno.guestId}`
                                                            )
                                                            .then(
                                                              (response) =>
                                                              (GuestDueAmount =
                                                                response.data)
                                                            );
                                                          console.log(
                                                            GuestDueAmount
                                                          );

                                                          await axios
                                                            .get(
                                                              `/guest/getGuestByGuestId/${bdno.guestId}`
                                                            )
                                                            .then((res) => {
                                                              GuestDetails =
                                                                res.data;
                                                              console.log(
                                                                GuestDetails
                                                              );

                                                              setOpen(true);
                                                              setLoading(true);
                                                            })
                                                            .catch((err) => {
                                                              console.log(err);
                                                            });

                                                          // await axios .get(`guest/getPendingAndCompletedById/${bdno.guestId}`)
                                                          // .then((res) => {
                                                          //   GuestDueAmount = res.data;
                                                          //   console.log(GuestDueAmount)

                                                          // })
                                                        }}
                                                      />
                                                    </Tooltip>
                                                  );
                                                }
                                              })()}
                                            </Grid>
                                            {/* {bdno.bedStatus === true ? 
                                                                                             (<IconButton><HotelOutlinedIcon color="success" /></IconButton>)
                                                                                    :
                                                                                            (<IconButton onClick={() => { setOpen(true) }}><HotelOutlinedIcon color="error" /></IconButton>) }                                                                                                                                                                                                                                                             */}
                                            <Grid item xs={12} align="center">
                                              <h6
                                                align="center"
                                                key={bdno.bedName}
                                              >
                                                {bdno.bedName}
                                              </h6>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </>
                                    );
                                  })}
                                </Grid>
                              </Grid>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </Grid>
              </>
            );
          })
        ) : (
          // "loading...."
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
            onClick={closeLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </MDBox>
    </>
  );
};
export default BuildingsLayout;
