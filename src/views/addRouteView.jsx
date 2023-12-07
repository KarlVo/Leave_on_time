import React, {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import metroArray from '/src/metrosArray';
import InputLabel from '@mui/material/InputLabel';
import SaveIcon from '@mui/icons-material/Save';

function addRouteView(props) {
    //const spacing = '20px'; // Adjust the spacing as needed
    
    const [selectedValue, setSelectedValue] = useState('');
    const numberOptions = Array.from({ length: 60 }, (_, index) => index + 1); 
   
    
    function textChangeStation(event){
        console.log("textChangeStation");
        props.textStation(event.target.value);
      }

    function textChangeTowards(event){
        console.log("textChangeTowards");
        props.textTowards(event.target.value);
      }
    
    function textChangeLine(event){
        console.log("textChangeLine");
        props.textLine(event.target.value);
      }
    
    function handleChange(event) {
        console.log("handleChange");
        setSelectedValue(event.target.value);
        props.textMin(event.target.value);
      }

    function closeAddRoute(){
        console.log("closeAddRoute");
        window.location.hash="#/";
    }

    function saveRoute(){
      console.log("saveRoute");
      props.submitEvent();
    }
    
    return (
      <Box display="flex" flexDirection='column'>
       
        <Box display="flex" justifyContent="flex-end">
          <CloseIcon onClick={closeAddRoute} />
        </Box>
        <Box flexDirection='column' marginTop={2} marginBottom={2}>
        
          <Autocomplete
          fullWidth
        disablePortal
        id="combo-box-demo"
        options={metroArray}
        
        renderInput={(params) => <TextField {...params} label="New Station" onChange={textChangeStation} variant="outlined" id="outlined-basic" fullWidth />}
/>
        </Box>
          <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="time-to-station">Time to Station</InputLabel>
              <Select label="Time to Station" value={selectedValue} onChange={handleChange}>
                  <MenuItem value="">Select number of minutes</MenuItem>
                  {numberOptions.map((number) => (
                  <MenuItem key={number} value={number}>{number}</MenuItem>  
                  ))}
              </Select>
          </FormControl>
        
        <Box flexDirection='column' marginTop={2} marginBottom={2}>
          <TextField onChange={textChangeTowards} id="outlined-basic" label="Towards" variant="outlined" fullWidth />
        </Box>
        <Box flexDirection='column' marginBottom={2}>
          <TextField onChange={textChangeLine} id="outlined-basic" label="Line" variant="outlined" fullWidth/>
        </Box>
        <Box display="flex">
          <SaveIcon onClick={saveRoute} />
        </Box>
      </Box>
    );
  }
  
  export default addRouteView;
  