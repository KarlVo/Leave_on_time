import {observer} from 'mobx-react-lite';
import resolvePromise from '/src/resolvePromise.js';

import React from 'react';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import Typography from '@mui/material/Typography';

import BusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import TrainIcon from '@mui/icons-material/Train';
import SubwayIcon from '@mui/icons-material/Subway';
import BoatIcon from '@mui/icons-material/DirectionsBoat';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

export default observer (
    function EditRouterView(props) {
        function addRouteACB(evt) {
            window.location.hash='addroute';
        }

        function editRouteACB(evt) {
            window.location.hash='editroute';
        }

        function locationPageACB(evt) {
            window.location.hash='';
        }

        function getRoutesACB(evt) {
            props.getRoutes('9600', '1079', 11);
            //props.getRoutes('9117', '9700', 11);
            //props.getRoutes('1079', '9001', 11);
            //props.getRoutes('9325', '3601', 11);
            //props.getRoutes('1105', '0312', 5);
        }

        function routesDetailsACB(route) {
            const distance = 11;

            const info = route.LegList.Leg[0];
            console.log(info);

            let plusMinus;
            let timezoneOffset = new Date().getTimezoneOffset();
            if (timezoneOffset < 0) {
                timezoneOffset = Math.abs(timezoneOffset);
                plusMinus = '+'
            } else {
                plusMinus = '-'
            }

            let hours = String((timezoneOffset - (timezoneOffset % 60))/60);
            let minutes = String(timezoneOffset % 60);

            if (hours.length === 1) {
                hours = '0' + hours;
            }
            if (minutes.length === 1) {
                minutes = '0' + minutes;
            }

            const Z = plusMinus + hours + ':' + minutes;

            let timestamp = parseInt(Date.parse(info.Origin.date + 'T' + info.Origin.time + '.000' + Z));
            let timeToLeave = String(Math.floor(((timestamp - Date.now())/1000)/60 - distance));

            let transitSymbol;
            if (info.Product.catIn === 'BUS') {
                transitSymbol = <BusIcon />;
            } else if (info.Product.catIn === 'MET') {
                transitSymbol = <SubwayIcon />;
            } else if (info.Product.catIn === 'TRM') {
                transitSymbol = <TramIcon />;
            } else if (info.Product.catIn === 'TRN') {
                transitSymbol = <TrainIcon />;
            } else if (info.Product.catIn.includes('FERRY FEY FRY SHIP SHP')) {
                transitSymbol = <BoatIcon />;
            } else {
                transitSymbol = <BusIcon />;
            }

            return (
                <Box key={info.number}>
                    <Box>{transitSymbol}</Box>
                    <Box>Line: {info.Product.line}</Box>
                    <Box>Towards: {info.direction}</Box>
                    <Box>Time to leave: {timeToLeave}</Box>
                    <br></br>
                </Box>
            );
        }

        return (
            <Grid xs={true}>
                <Paper elevation={3} className='mainContent'>
                    <Grid container>
                        <Grid xs={true}>
                            <Box className='pageHead'>
                                <Breadcrumbs aria-label='breadcrumb'>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' icon={<PlaceIcon />} onClick={locationPageACB} label={props.location.name} /></Typography>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' label={'ROUTE NAME'} /></Typography>
                                    <Typography variant='h4' component='h2'><Chip className='navItem' variant='outlined' onDelete={locationPageACB} label='EDIT ROUTE' /></Typography>
                                </Breadcrumbs>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={'40px'} sx={{padding: '40px'}}>
                        <Grid xs={12}>
                            <Button onClick={getRoutesACB}>Click Me!</Button>
                        </Grid>
                        {props.routes ? props.routes.Trip.slice(0, 4).map(routesDetailsACB) : <Box>Nothing to render...</Box>}
                    </Grid>
                </Paper>
            </Grid>
        );
    }
);