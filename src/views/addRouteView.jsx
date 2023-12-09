import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
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
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

function addRouteView(props) {
    //const spacing = '20px'; // Adjust the spacing as needed
    
    const [selectedValue, setSelectedValue] = useState('');
    const numberOptions = Array.from({ length: 60 }, (_, index) => index + 1); 
    const [value, setValue] = React.useState(30);
    
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
    
    /*
    function handleChange(event) {
        console.log("handleChange");
        setSelectedValue(event.target.value);
        props.textMin(event.target.value);
      }
      */
    function closeAddRoute(){
        console.log("closeAddRoute");
        window.location.hash="#/";
    }

    function saveRoute(){
      console.log("saveRoute");
      props.submitEvent();
    }
    const Input = styled(MuiInput)`
  width: 42px;
`;


  const handleSliderChange = (event, newValue) => { // slider code from https://mui.com/material-ui/react-slider/
    console.log("handleSliderChange");
    setValue(newValue);
    props.textMin(event.target.value);
    
  };

  const handleInputChange = (event) => {
    console.log("handleInputChange");
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
    props.textMin(event.target.value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
      
    return (
      <Box display="flex" flexDirection='column'>
       
       
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
        <Box>
          <SaveIcon onClick={saveRoute} />
        </Box>
        <Box>
          <CloseIcon onClick={closeAddRoute} />
        </Box>
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
        <Box flexDirection='column' marginTop={2} marginBottom={2}>
          <TextField onChange={textChangeTowards} id="outlined-basic" label="Towards" variant="outlined" fullWidth />
        </Box>

       
<Box flexDirection='column' marginBottom={2}>
      <Box sx={{ width: 250 }}>
        <Typography id="input-slider" gutterBottom>Time to Station</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <DirectionsRunIcon />
          </Grid>
          <Grid item xs>
            <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby="input-slider" min={0} max={20}
            />
          </Grid>
          <Grid item>
            <Input value={value} size="small" onChange={handleInputChange} onBlur={handleBlur} inputProps={{ step: 1, min: 0, max: 30, type: 'number', 'aria-labelledby': 'input-slider', }} />
            <span style={{ marginLeft: '4px' }}>min</span>
          </Grid>
        </Grid>
      </Box>
    </Box>
      
      </Box>
    );
  }
  
  export default addRouteView;
  