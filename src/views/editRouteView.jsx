import {observer} from 'mobx-react-lite';

import React from 'react';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';

export default observer (
    function EditRouterView(props) {
        function locationPageACB(evt) {
            window.location.hash='';
        }

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
                        Todo
                    </Grid>
                </Paper>
            </Grid>
        );
    }
);