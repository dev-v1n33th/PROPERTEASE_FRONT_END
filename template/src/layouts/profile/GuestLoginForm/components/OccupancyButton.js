import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import days from "./Days";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormControl from "@mui/material/FormControl";
//import { DataGrid } from "@mui/x-data-grid";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { TableCell, TableContainer } from "@mui/material";
// import { Form } from "formik";
//import { Form, Table } from "react-bootstrap";
import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import axios from "../../../../Uri";
// import { DataGrid, GridColDef } from "@material-ui/data-grid";
//import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Tables from "./Tables";
import Paper from "@mui/material/Paper";
import SecurityDepo from "./SecurityDepo";
//styles
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
//   padding: "20px 48px",
  border: "1px solid",
  lineHeight: 1.9,
  variant: "contained",
  color: "black",
  backgroundColor: "#f5f5f5",
  // backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0063cc",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0063cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function CustomizedButtons(props) {
  let totalRentForRegular = 0;
  let totalRentForOneMonth = 0;
  let totalRentForDaily=0;
  const [selectedRow, setSelectedRow] = useState();
  const [rentData, setRentData] = useState([]);
  const[dailyData,setDailyData]=useState([]);
  const[monthlyData,setMonthlyData]=useState([])
  const [duration, setDuration] = useState();
  const [occupancyType, setOccupancyType] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState();

    useEffect(() => {
      let url = `guest/getRatesByBuildingId/${props.buildingId}/regular`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          setRentData(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong🤦‍♂️");
        });
        let url2 = `guest/getRatesByBuildingId/${props.buildingId}/daily`;
        axios
          .get(url2)
          .then((res) => {
            console.log(res.data);
            setDailyData(res.data);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong🤦‍♂️");
          });
          let url3 = `guest/getRatesByBuildingId/${props.buildingId}/OneMonth`;
          axios
            .get(url3)
            .then((res) => {
              console.log(res.data);
              setMonthlyData(res.data);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Something went wrong🤦‍♂️");
            });
    }, [1]);


  const handleChange = (event) => {
    setDuration(event.target.value);
  };
  const handleChangeSecurityDeposit = (event) => {
    setSecurityDeposit(event.target.value);
  };


  const getSec = (data) => {
    console.log("hgf" + data);
    setSecurityDeposit(data);
  };

  const getRow = (data) => {
    console.log("row" + data);
    setSelectedRow(data);
  };

  //calculating rent amount for total
  const monthlySec = 0;
  totalRentForRegular = selectedRow + securityDeposit;
  totalRentForOneMonth= selectedRow+monthlySec;
  totalRentForDaily = (selectedRow + monthlySec)*duration;

  //sending this object as prop to parent component guest onboarding form
  const occupancyObject = {
    occupancyType: occupancyType,
    defaultRent: selectedRow,
    securityDeposit: securityDeposit,
    duration:duration
  };
  props.func(occupancyObject);

  return (
    <>
      <Grid
        item
        xs={12}
        style={{
          align: "center",
          marginLeft: 7,
          marginRight: 240,
          marginLeft: 150,
          width: "69%",
          paddingTop: 20,
        }}
      >
        <Grid item xs={12}>
          <Stack spacing={1} direction="row">
            <Grid container spacing={23} paddingLeft={0} paddingRight={1}>
              <Grid item xs={4}>
                <BootstrapButton
                  variant="contained"
                  disableRipple
                  value="regular"
                  style={{width: '100%', height: '100%'}}
                  onClick={(e) => {
                    setOccupancyType(e.target.value);
                  }}
                >
                  Regular
                </BootstrapButton>
              </Grid>

              <Grid item xs={4}>
                <BootstrapButton
                  variant="contained"
                  disableRipple
                  style={{width: '100%', height: '100%'}}
                  value="OneMonth"
                  onClick={(e) => {
                    setOccupancyType(e.target.value);
                  }}
                >
                  One Month
                </BootstrapButton>
              </Grid>
              <Grid item xs={4}>
                <BootstrapButton
                  variant="contained"
                  disableRipple
                  style={{width: '100%', height: '100%'}}
                  value="daily"
                  onClick={(e) => {
                    setOccupancyType(e.target.value);
                  }}
                >
                  Daily
                </BootstrapButton>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {occupancyType == "regular" ? (
            <div style={{ width: "100%", paddingTop: 50 }}>

              <Tables
                func={getRow}
                occupancyType={occupancyType}
                buildingId={props.buildingId}
                tableData={rentData}
              />
              <br />
              <Grid
                container
                spacing={1}
                style={{ paddingLeft: 10, height: 49 }}
              >
                <Stack spacing={2} direction="row">
                  <Grid item xs={6}>
                    <h4>Security Deposit</h4>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ m: 1, minWidth: 190 }}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={securityDeposit}
                        label="Security Depsit"
                        onChange={handleChangeSecurityDeposit}
                      >
                        <MenuItem value={3000}>3000</MenuItem>
                        <MenuItem value={5000}>5000</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
              <h3 align="center">Invoice</h3>
            <TableContainer
              style={{
                backgroundColor: "#1e90ff",
                color: "white",
                fontSize: "10px",
              }}
            >
              <Table aria-label="simple table">
                <TableRow>
                  <TableCell align="left">Rent</TableCell>

                  <TableCell align="left">{selectedRow}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Security Deposit</TableCell>

                  <TableCell align="left">{securityDeposit}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Total</TableCell>

                  <TableCell align="left">{totalRentForRegular}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            </div>
          ) : (
            <div></div>
          )}
          {occupancyType == "OneMonth" ? (
            <div style={{ paddingTop: 50 }}>
              <Tables
                func={getRow}
                occupancyType={occupancyType}
                buildingId={props.buildingId}
                tableData={monthlyData}
              />
              <br/>
              <h3 align="center">Invoice</h3>
            <TableContainer
              style={{ backgroundColor: "#1e90ff", color: "white" }}
            >
              <Table aria-label="simple table">
                <TableRow>
                  <TableCell align="left">Rent</TableCell>

                  <TableCell align="left">{selectedRow}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Security Deposit</TableCell>

                  <TableCell align="left">{monthlySec}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Total</TableCell>

                  <TableCell align="left">{totalRentForOneMonth}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            </div>
          ) : (
            <div></div>
          )}
          {occupancyType == "daily" ? (
            <div
              style={{
                paddingTop: 50,
              }}
            >
              <Tables
                func={getRow}
                occupancyType={occupancyType}
                buildingId={props.buildingId}
                tableData={dailyData}
              />
              <br />
              <Grid
                container
                spacing={1}
                style={{ paddingLeft: 10, height: 49 }}
              >
                <Stack spacing={2} direction="row">
                  <Grid item xs={6}>
                    <h4>Duration</h4>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ m: 1, minWidth: 190 }}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={duration}
                        label="Duration"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>{1}</MenuItem>
                        <MenuItem value={2}>{2}</MenuItem>
                        <MenuItem value={3}>{3}</MenuItem>
                        <MenuItem value={4}>{4}</MenuItem>
                        <MenuItem value={5}>{5}</MenuItem>
                        <MenuItem value={6}>{6}</MenuItem>
                        <MenuItem value={7}>{7}</MenuItem>
                        <MenuItem value={8}>{8}</MenuItem>
                        <MenuItem value={9}>{9}</MenuItem>
                        <MenuItem value={10}>{10}</MenuItem>
                        <MenuItem value={11}>{11}</MenuItem>
                        <MenuItem value={12}>{12}</MenuItem>
                        <MenuItem value={13}>{13}</MenuItem>
                        <MenuItem value={14}>{14}</MenuItem>
                        <MenuItem value={15}>{15}</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
              <h3 align="center">Invoice</h3>
            <TableContainer
              style={{ backgroundColor: "#1e90ff", color: "white" }}
            >
              <Table aria-label="simple table">
                <TableRow>
                  <TableCell align="left">Rent</TableCell>

                  <TableCell align="left">{selectedRow}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Security Deposit</TableCell>

                  <TableCell align="left">{monthlySec}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left">Total</TableCell>

                  <TableCell align="left">{totalRentForDaily}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            </div>
          ) : (
            <div></div>
          )}
        </Grid>
        <br />
      </Grid>
    </>
  );
}

