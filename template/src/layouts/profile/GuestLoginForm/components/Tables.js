import React, { useEffect, useState } from "react";
// import "./styles.css";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Pagination, Table, TableContainer, TableRow } from "@mui/material";
import { TableCell } from "@material-ui/core";
import axios from "../../../../Uri";
import { TableRows } from "@mui/icons-material";

// import SecurityDepo from "./securityDepo";

let ren1 = {
  value: 3000,
};

let ren2 = {
  value: 4000,
};

let ren3 = {
  value: 5000,
};

//Functions

export default function Tables(props) {
  // console.log(SecurityDepo.securityDeposit);
//   useEffect(() => {
//     let url = `guest/getRatesByBuildingId/${props.buildingId}/${props.occupancyType}`;
//     //   http://localhost:8989/guest/getRatesByBuildingId/1/regular
//     axios
//       .get(
//         `guest/getRatesByBuildingId/${props.buildingId}/${props.occupancyType}`
//       )
//       .then((res) => {
//         console.log(res);
//         setRentData(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Something went wrong🤦‍♂️");
//       });
//   }, []);
  const rows = props.tableData
  console.log(rows)
//     {
//       id: 1,
//       sharing: "Single Sharing",
//       rent: `AC : ${ren1.value}`,
//       value: ren1.value,
//     },
//     {
//       id: 2,
//       sharing: "Two Sharing",
//       rent: `AC : ${ren2.value}`,
//       value: ren2.value,
//     },
//     {
//       id: 3,
//       sharing: "Three Sharing",
//       rent: `AC : ${ren3.value}`,

//       value: ren3.value,
//     },
//     {
//       id: 4,
//       sharing: "Single Sharing",
//       rent: `Non AC : ${ren1.value}`,
//       value: ren1.value,
//     },
//     {
//       id: 5,
//       sharing: "Two Sharing",
//       rent: `Non AC : ${ren2.value}`,
//       value: ren2.value,
//     },
//     {
//       id: 6,
//       sharing: "Three Sharing",
//       rent: `Non AC : ${ren3.value}`,
//       value: ren3.value,
//     },
//   ];

    
  const [rentData, setRentData] = useState([]);

  const [selectedRows, setSelectedRows] = React.useState({});
  console.log(selectedRows);

  //   const [occupancyType, setOccupancyType] = useState("regular");


  console.log(rentData);
  let radioChecked = [rows[0].id];

  const [selectionModel, setSelectionModel] = React.useState(radioChecked);
  radioChecked = selectionModel;
  // Rows and Columns
  const columns = [
    {
      field: "radiobutton",
      headerName: "Select",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Radio checked={radioChecked[0] === params.id} value={params.id} />
      ),
    },
    //   {
    //     field: "id",
    //     headerName: "ID",
    //     width: 150
    //   },
    {
      field: "sharing",
      headerName: "Sharing",
      width: 150,
    },
    {
      field: "price",
      headerName: "Rent",
      width: 150,
    },
    {
      field: "roomType",
      headerName: "Room Type",
      width: 150,
    },
  ];

  const selectedRow = rows.filter((item) => {
    return item.id === selectionModel[0];
  });
  props.func(selectedRow[0].price);
  console.log(props.buildingId);
  console.log(props.occupancyType);

  console.log("tablesec" + props.securityDeposit);
  // console.log(selectedRows);

  // console.log(selectedRow);

  return (
    <div className="App">
      <Grid>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          selectionModel={selectionModel}
          pagination={false}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            console.log(selectionModel);
            setSelectedRows(selectedRow);
          }}
        />
        <div style={{ marginTop: "40px" }}>
          You have selected: {selectedRow[0].sharing}  sharing room and rent of the that room was{"  "}
          &#8377; {selectedRow[0].price} 
        </div>
      </Grid>
    </div>
  );
}
