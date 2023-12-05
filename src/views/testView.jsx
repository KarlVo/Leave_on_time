import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


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

  return (
    <Box display="flex">
      <Button onClick={openAddRoute} variant="contained" style={{ marginRight: spacing }}>
        Add Route
      </Button>
      <Button variant="contained">Settings</Button>
      <Button onClick={handleAPICall} variant="contained">Hämta API test</Button>
      <TextField onChange={textChange} id="outlined-basic" label="Outlined" variant="outlined" />

    </Box>
  );
}

export default TestView;
