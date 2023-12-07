import React, {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import CloseIcon from '@mui/icons-material/Close';
function addRouteView(props) {
    //const spacing = '20px'; // Adjust the spacing as needed
    
    const [selectedValue, setSelectedValue] = useState('');
    const numberOptions = Array.from({ length: 60 }, (_, index) => index + 1); 
   
    
    function textChangeStation(event){
        console.log("textChangeStation");
        props.textEntry(event.target.value);
      }

    function textChangeTowards(event){
        console.log("textChangeTowards");
        //props.textEntry(event.target.value);
      }
    
    function textChangeLine(event){
        console.log("textChangeLine");
        //props.textEntry(event.target.value);
      }
    
    function handleChange(event) {
        console.log("handleChange");
        setSelectedValue(event.target.value);
        //props.textEntry(event.target.value);
      }

    function closeAddRoute(){
        console.log("closeAddRoute");
        window.location.hash="#/";
    }

    
    return (
      <Box display="flex" flexDirection='column'>
        
        <Box display="flex" justifyContent="flex-end">
          <CloseIcon onClick={closeAddRoute} />
        </Box>
        <Box flexDirection='column' marginTop={2} marginBottom={2}>
          <TextField onChange={textChangeStation} id="outlined-basic" label="New Station name" variant="outlined" fullWidth/>
        </Box>
          <FormControl>
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
        
      </Box>
    );
  }
  
  export default addRouteView;
  