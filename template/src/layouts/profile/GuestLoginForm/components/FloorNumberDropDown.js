import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FloorNumberDropDown() {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 530 }}>
        <InputLabel htmlFor="grouped-native-select">FloorNumber</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">/;
            <option value={1}>1</option>
            <option value={2}>2</option> 
            <option value={2}>3</option> 

            <option value={2}>4</option> 

            <option value={2}>5</option> 

        </Select>
      </FormControl>
      
    </div>
  );
}
