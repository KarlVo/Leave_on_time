import {observer} from 'mobx-react-lite';
import LineInfo from '/src/model/LineInfo.js';

import React from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import Skeleton from '@mui/material/Skeleton';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import BusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import TrainIcon from '@mui/icons-material/Train';
import SubwayIcon from '@mui/icons-material/Subway';
import BoatIcon from '@mui/icons-material/DirectionsBoat';
import WalkIcon from '@mui/icons-material/DirectionsWalk';

export default observer (
    function RouteView(props) {
        function editRouteACB(evt) {
            props.setCurrentRoute(props.route.id);
            window.location.hash='editroute';
        }

        function deleteRouteACB(evt) {
            props.deleteRoute(props.route.id);
        }

        function displayLinesCB(line) {
            const info = line.LegList.Leg[0];
            const distance = parseInt(props.route.stationDistance);

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

            let color = 'default';

            let transitSymbol;
            if (info.Product !== undefined) {
                if (info.Product.catIn === 'BUS') {
                    if (LineInfo.BlueBus.includes(info.Product.line)) {
                        color = 'info';
                    } else {
                        color = 'error';
                    }
                    transitSymbol = <BusIcon />;
                } else if (info.Product.catIn === 'MET') {
                    if (LineInfo.SubwayRedLine.includes(info.Product.line)) {
                        color = 'error';
                    } else if (LineInfo.SubwayGreenLine.includes(info.Product.line)) {
                        color = 'success';
                    } else {
                        color = 'info';
                    }
                    transitSymbol = <SubwayIcon />;
                } else if (info.Product.catIn === 'TRM') {
                    color = 'warning';
                    transitSymbol = <TramIcon />;
                } else if (info.Product.catIn === 'TRN') {
                    color = 'secondary';
                    transitSymbol = <TrainIcon />;
                } else if (info.Product.catIn.includes('FERRY FEY FRY SHIP SHP')) {
                    color = 'primary';
                    transitSymbol = <BoatIcon />;
                } else {
                    transitSymbol = <BusIcon />;
                }
            } else {
                transitSymbol = <WalkIcon />;
                info.Product = {};
                info.Product.line = '---';
            }

            return (
                <Grid container spacing={1} key={info.number}>
                    <Grid xs={1}>{transitSymbol}</Grid>
                    <Grid xs={2}><Chip color={color} size='small' variant='filled' label={info.Product.line} /></Grid>
                    <Grid xs={7}><Typography variant='body2' component='span'>{info.direction}</Typography></Grid>
                    <Grid xs={2}><Typography variant='body2' component='span'>{timeToLeave} min</Typography></Grid>
                </Grid>
            );
        }

        function renderPlaceHolder() {
            const iconDim = 25;
            const fontSize = '1.3rem';
            return (
                <Grid container spacing={1}>
                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={7}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={2}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>

                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={7}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={2}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>

                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={7}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={2}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>

                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={7}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={2}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                </Grid>
            );
        }

        return (
            <Grid xs={4}>
                <Paper elevation={5}>
                    <Box className='block'>
                        <Typography variant='button' component='h3'>{props.route.fromName} &gt; {props.route.toName}</Typography>
                    </Box>

                    <Divider />

                    <Box className='block'>
                        {props.route.getRoutesPromiseState.data ? props.route.getRoutesPromiseState.data.Trip.slice(0, 4).map(displayLinesCB) : renderPlaceHolder()}
                    </Box>

                    <Divider />

                    <Box className='block'>
                        <Grid container>
                            <Grid xs={true}>
                                <FormGroup>
                                    <FormControlLabel size='small' control={<Switch defaultChecked={props.route.focused} />} label='Focus' />
                                </FormGroup>
                            </Grid>
                            <Grid xs={'auto'}>
                                <IconButton aria-label="settings" onClick={editRouteACB}>
                                    <SettingsIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={deleteRouteACB}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        );
    }
);