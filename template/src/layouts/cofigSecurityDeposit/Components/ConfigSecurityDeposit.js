import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, InputLabel } from "@mui/material";
// import axios from "axios";
import axios from "../../../Uri";
// import Select from '../../profile/GuestLoginForm/components/Select'
import { alpha } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form } from "formik";
import Select from "../../profile/GuestLoginForm/components/Select";

// import { height, width } from "@mui/system";

function ConfigSecurityDeposit() {
  let userData = JSON.parse(sessionStorage.getItem("userdata"));
  let userId = userData.data.userId;
  // console.log(userId);
  var obj1 = null;
  var obj2 = null;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/guest/getSecurityDeposit")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    // {
    //   title: "ID",
    //   field: "id",
    //   editable: false,
    //   headerStyle: {
    //     backgroundColor: "#1E90FF",
    //     color: "white",
    //   },
    //   validate: (rowData) => {
    //     if (rowData.Id === undefined) {
    //       return "Id is Required";
    //     }
    //     return true;
    //   },
    // },

    {
      title: "Occupency Type",
      field: "occupencyType",
      lookup: {
        Daily: "Daily",
        Monthly: "Monthly",
        Regular: "Regular",
      },
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
      // validate: (rowData) => {
      //   if (rowData.occupencyType === undefined) {
      //     return "Occupency Type is Required";
      //   } else if (!rowData.occupencyType.match(/[^0-9]/g)) {
      //     return " Please enter valid Type";
      //   }
      //   return true;
      // },
    },
    {
      title: "Security Deposit",
      field: "securityDepositAmount",
      headerStyle: {
        backgroundColor: "#1E90FF",
        color: "white",
      },
      // validate: (rowData) => {
      //   if (rowData.securityDepositAmount === undefined) {
      //     return "Security Deposit is Required";
      //   } else if (!rowData.securityDepositAmount.match(/[^0-9]/g)) {
      //     return " Please enter valid numbers";
      //   }
      //   return true;
      // },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <MaterialTable
            title="Configure Security Deposit"
            data={data}
            sx={{ color: "white" }}
            columns={columns}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  const updatedRows = [
                    ...data,
                    { id: Math.floor(Math.random() * 100), ...newRow },
                  ];

                  setTimeout(() => {
                    const res = axios
                      .post(
                        "/guest/addSecurityDeposit",

                        newRow
                      )
                      .then(() => {toast.success("New data added")})  
                      .catch((err) => {
                        toast.error("Server error");
                      });
                    console.log(newRow);
                    
                    setData(updatedRows);
                    resolve();
                  }, 2000);
                }),
              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  console.log(oldRow);
                  console.log(updatedRow);
                  const index = oldRow.id;
                  console.log(index);
                  const updatedRows = [...data];
                  console.log(updatedRows);
                  updatedRows[oldRow.tableData.id] = updatedRow;
                  console.log(updatedRows);

                  setTimeout(() => {
                    const res = axios
                      .put(`/guest/updateSecurityDeposit/${index}`, updatedRow)
                      .then((resp) => {
                        console.log(resp);
                      })

                      .catch((err) => {
                        toast.error("Server error");
                      });

                    toast.success(" Updated Successfully");
                    setData(updatedRows);
                    console.log(updatedRows);
                    resolve();
                  }, 2000);
                }),
            }}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
              grouping: true,
              addRowPosition: "first",
              headerStyle: {
                backgroundColor: "#1E90FF",
                color: "white",
                fontSize: "20px",
                //height: "10px",
                //fontWeight: 'bold'
              },
              rowStyle: {
                fontSize: 19,
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ConfigSecurityDeposit;
