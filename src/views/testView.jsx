import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import metroArray from '/src/metrosArray';  // Update the path accordingly


function TestView(props) {
  const spacing = '20px'; // Adjust the spacing as needed


  function handleAPICall(){
    props.stationTable();
  }

  function textChange(event){
    props.textEntry(event.target.value);
  }

  function openAddRoute(){
    props.openAddRoute();
  }


  
    const stations = [
      'Station 1',
      'Station 2',
      'Station 3',
      // Add more station names as needed
    ];
  

  return (
    <Box display="flex">
      <Button onClick={openAddRoute} variant="contained" style={{ marginRight: spacing }}>
        Add Route
      </Button>
      <Button variant="contained">Settings</Button>
      <Button onClick={handleAPICall} variant="contained">Hämta API test</Button>
      <TextField onChange={textChange} id="outlined-basic" label="Outlined" variant="outlined" />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={metroArray}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Stations" />}
/>

    </Box>
  );
}

export default TestView;
