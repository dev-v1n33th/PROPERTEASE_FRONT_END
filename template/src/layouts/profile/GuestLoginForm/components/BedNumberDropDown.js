import React, { useEffect,useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';

export default function BedNumberDropDown() {
  const [bed,setBed] = useState([])


  useEffect(() => {
    axios
      .get("http://localhost:8085/bed/getBedsByAllBuildings")
      .then((res) => {
        setBed(res.data.map(info => info.floors));
       // .map(data => data.rooms.map(da=> da.beds.map(d => d.available)))

        console.log(res.data.map(info => info.floors.map(data => data.rooms.map(da=> da.beds.map(d => d.available ? console.log(d.bedNumber):console.log("Beds Not Available")))))
          );
          // console.log(bed)
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 530 }}>
        <InputLabel htmlFor="grouped-native-select">Bed Id</InputLabel>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          label="Grouping"
        >
          /;
          <option></option>{bed.map((e,key)=>{
          return <option   key={key} value={e.bedNumber}>{e.bedNumber}</option>
        })}
          {/* <option value={1}>A</option>
          <option value={2}>B</option>
          <option value={2}>C</option>
          <option value={2}>D</option> */}
        </Select>
      </FormControl>
    </div>
  );
}
