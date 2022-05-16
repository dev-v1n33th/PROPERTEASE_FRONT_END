import * as React from 'react';
import {useEffect} from 'react';
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//http://localhost:8085/room/getBedsByBuildings
// const [buildingInfo, setBuildingInfo] = React.useState([]);
// //  const [Floors, setFloors] = React.useState([]);
// useEffect(() => {
//     const GetData = async () => {
//         const url = "http://localhost:8085/room/getBedsByBuildings";
//         try {
//             const resp = await fetch(url);
//             const build = await resp.json();
//             setBuildingInfo(build);
//             // setFloors(build.floors)
//         }
//         catch (err) {
//             console.error(err);
//         }
//     }
//     GetData();
// }, []);
// //

export default function BuildingNameDropDown() {
  const [building, setBuilding] = React.useState([]);
  const [bed,setBed]=React.useState([])
//   //  const [Floors, setFloors] = React.useState([]);
//   useEffect(() => {
//       const GetData = async () => {
//           const url = "http://localhost:8085/room/getBedsByBuildings";
//           try {
//               const resp = await fetch(url);
//               const build = await resp.json();

//               setBuildingInfo(build);
              
//               console.log(buildingInfo)
//               // setFloors(build.floors)
//           }
//           catch (err) {
//               console.error(err);
//           }
//       }
//       GetData();
//   }, []);
useEffect(() => {
  axios
    .get("http://localhost:8085/bed/getBedsByAllBuildings")
    .then((res) => {
      setBuilding(res.data);

      //console.log(res.data);
    })

    .catch((err) => {
      console.log(err);
    });
}, []);
// useEffect(() => {
//   axios
//     .get("http://localhost:8085/room/getBedsByBuildings")
//     .then((res) => {
//       setBed(res.data.map(info => info.floors.map(data => data.rooms.map(da=> da.beds.map(d => d.available ? console.log(d.bedNumber):console.log("Beds Not Available"))))));
//      // .map(data => data.rooms.map(da=> da.beds.map(d => d.available)))

//       console.log(res.data.map(info => info.floors.map(data => data.rooms.map(da=> da.beds.map(d => d.available ? console.log(d.bedNumber):console.log("Beds Not Available")))))
//         );
//         // console.log(bed)
//     })

//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 530 }}>
        <InputLabel htmlFor="grouped-native-select">BuildingName</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">/;
        {/* <option></option>{building.map((e,key)=>{
          return <option   key={key} value={e.buildingName}>{e.buildingName}</option>
        })} */}
        <option value=""></option>{
          building.map((value)=>(
            <option value={value.id} key={value.id}>
              {value.buildingName}
            </option>
          ))}
            
        </Select>
        <br/>
        <InputLabel >Bed</InputLabel>
        <Select native defaultValue="" id="grouped-native-selectd" label="Grouping">/;
        {/* <option></option>{building.map((e,key)=>{
          return <option   key={key} value={e.buildingName}>{e.buildingName}</option>
        })} */}
        <option value=""></option>{
          bed.map((value)=>(
            <option value={value.id} key={value.id}>
              {value.available}
            </option>
          ))}
            
        </Select>
      </FormControl>
      
    </div>
  );
}
