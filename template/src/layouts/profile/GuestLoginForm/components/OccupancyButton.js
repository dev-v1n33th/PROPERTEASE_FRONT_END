import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  padding: "20px 48px",
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
  var totalRentForRegular = 0;
  var totalRentForMonOrDaily = 0;
  //sending props to parent function
  // props.func(rentAmount);
  //use
  const [securityDeposit, setSecurityDeposit] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const[rentData,setRentData] = useState([]);
  console.log(props.buildingId)
  const [occupancyType, setOccupancyType] = useState("");
  useEffect(() => {
    let url=`guest/getRatesByBuildingId/1/${occupancyType}`;
    axios.get(url).then((res)=>{
        console.log(res.data)
        setRentData(res.data)
    }).catch((err) => {
        console.log(err);
        toast.error("Something went wrong🤦‍♂️")
      });
  },[])
console.log(rentData)

  //   const[rentAmount, setRentAmount] = useState();
  // console.log(rentAmount)

  //props.func(occupancyType)

  const [totalRent, setTotalRent] = useState(0);
  console.log(props.selectedRow);
  //   if(occupancyType=="regular")
  //   {
  //     setTotalRent(securityDeposit+selectedRow)
  //   }
  console.log(totalRent);
  var value = null;
  const monthlySec = 0;
  console.log(value);

  const getSec = (data) => {
    console.log("hgf" + data);
    setSecurityDeposit(data);
  };

  const getRow = (data) => {
    console.log("row" + data);
    setSelectedRow(data);
  };

  totalRentForRegular = selectedRow + securityDeposit;
  totalRentForMonOrDaily = selectedRow + monthlySec;
  const occupancyObject = {
    occupancyType: occupancyType,
    defaultRent: selectedRow,
    securityDeposit: securityDeposit,
  };
  console.log(occupancyObject);
   props.func(occupancyObject)
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
                  onClick={(e) => setOccupancyType(e.target.value)}
                >
                  Regular
                </BootstrapButton>
              </Grid>

              <Grid item xs={4}>
                <BootstrapButton
                  variant="contained"
                  disableRipple
                  value="monthly"
                  onClick={(e) => {
                    setOccupancyType(e.target.value)
                }
                }
                >
                  Monthly
                </BootstrapButton>
              </Grid>
              <Grid item xs={4}>
                <BootstrapButton
                  variant="contained"
                  disableRipple
                  value="daily"
                  onClick={(e) => setOccupancyType(e.target.value)}
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
              <Tables func={getRow}  occupancyType={occupancyType} buildingId={props.buildingId} tableData={rentData} />
              <br />
              <SecurityDepo func={getSec} />
            </div>
          ) : (
            <div></div>
          )}
          {occupancyType == "monthly" ? (
            <div style={{ paddingTop: 50 }}>
              <Tables func={getRow}  occupancyType={occupancyType} buildingId={props.buildingId} tableData={rentData}/>
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
              <Tables func={getRow}  occupancyType={occupancyType} buildingId={props.buildingId} tableData={rentData}/>
            </div>
          ) : (
            <div></div>
          )}
        </Grid>
        <br />
        {occupancyType == "regular" ? (
          <div>
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
          <div>
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

                  <TableCell align="left">{totalRentForMonOrDaily}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
        )}
        {/* {(occupancyType==regular)?(setRentAmount(selectedRow+securityDeposit)):(setRentAmount(selectedRow+monthlySec))} */}
      </Grid>
    </>
  );
}
