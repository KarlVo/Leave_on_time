import {observer} from 'mobx-react-lite';

import React from 'react';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

export default observer (
    function EditRouterView(props) {
        function locationPageACB(evt) {
            window.location.hash='';
        }
        
        const [value, setValue ] = React.useState(props.location.routes[props.currentRoute].stationDistance);
        const handleSliderChange = (event, newValue) => {
            setValue(newValue);
            props.textMin(event.target.value);
        };

        const handleInputChange = (event) => {
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
            <Grid xs={true}>
                <Paper elevation={3} className='mainContent'>
                    <Grid container>
                        <Grid xs={true}>
                            <Box className='pageHead'>
                                <Breadcrumbs aria-label='breadcrumb'>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' icon={<PlaceIcon />} onClick={locationPageACB} label={props.location.name} /></Typography>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' label={props.location.routes[props.currentRoute].fromName + ' > ' + props.location.routes[props.currentRoute].toName} /></Typography>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' onDelete={locationPageACB} label='EDIT ROUTE' /></Typography>
                                </Breadcrumbs>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={'40px'} sx={{padding: '40px'}}>
                        <Box flexDirection='column' marginBottom={2}>
                            <Box sx={{ width: 700 }}>
                                <Typography id="input-slider" gutterBottom>Time to Station</Typography>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <DirectionsRunIcon />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby="input-slider" min={0} max={20}/>
                                    </Grid>
                                    <Grid item>
                                        <Input value={value} size="small" onChange={handleInputChange} onBlur={handleBlur} inputProps={{ step: 1, min: 0, max: 30, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                        <span style={{ marginLeft: '4px' }}>min</span>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>                    
                    </Grid>
                </Paper>
            </Grid>
        );
    }
);