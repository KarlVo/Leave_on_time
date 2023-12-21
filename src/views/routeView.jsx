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
        const [count, setCount] = React.useState(0);
        React.useEffect(() => {
            const incrementCount = () => {
            setCount(count + 1);
            };
            const timer = setTimeout(() => incrementCount(), 60000);
            return () => clearTimeout(timer);
        }, [count]);

        const minutesPassed = `${count}`;

        function editRouteACB(evt) {
            props.setCurrentRoute(props.route.id);
            window.location.hash='editroute';
        }

        function focusSwitchACB(evt) {
            props.focusSwitch(props.route.id);
        }

        function deleteRouteACB(evt) {
            props.deleteRoute(props.route.id);
        }

        function getTransportData(info) {
            let color = 'default';
            let transitSymbol;
            if (info.Product?.line) {
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

            return {
                symbol: transitSymbol,
                color: color,
                line: info.Product.line
            };
        }

        function getTimeToLeave(date, time) {
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

            let timestamp = parseInt(Date.parse(date + 'T' + time + '.000' + Z));

            return (String((Math.floor(((timestamp - Date.now())/1000)/60 - distance)) - parseInt(minutesPassed)));
        }

        function displayLinesCB(line) {
            const info = line.LegList.Leg[0];
            const transportInfo = getTransportData(info);
            let timeToLeave = getTimeToLeave(info.Origin.date, info.Origin.time);

            return (
                <Grid container spacing={1} key={info.number} className={parseInt(timeToLeave) < 0 ? 'passed' : 'notPassed'}>
                    <Grid xs={'auto'}>{transportInfo.symbol}</Grid>
                    <Grid xs={'auto'}><Chip color={transportInfo.color} className='lineChip' size='small' variant='filled' label={transportInfo.line} /></Grid>
                    <Grid xs={true}><Typography variant='body2' component='span'>{info.direction}</Typography></Grid>
                    <Grid xs={'auto'}><Typography variant='body2' component='span'>{parseInt(timeToLeave) < 0 ? '0' : timeToLeave} min</Typography></Grid>
                </Grid>
            );
        }

        function displayFocusedLineCB(line) {
            const info = line.LegList.Leg[0];
            const transportInfo = getTransportData(info);
            let timeToLeave = getTimeToLeave(info.Origin.date, info.Origin.time);

            return (
                <Grid container spacing={1} key={info.number} className={parseInt(timeToLeave) < 0 ? 'passedFocus' : 'notPassedFocus'}>
                    <Grid xs={true}></Grid>
                    <Grid xs={'auto'}>{transportInfo.symbol}</Grid>
                    <Grid xs={'auto'}><Chip color={transportInfo.color} className='lineChip' size='small' variant='filled' label={transportInfo.line} /></Grid>
                    <Grid xs={'auto'}><Typography variant='body2' component='span'>{info.direction}</Typography></Grid>
                    <Grid xs={true}></Grid>
                    <Grid xs={12} sx={{textAlign: 'center'}}><Typography variant='h1' component='span'>{parseInt(timeToLeave) < 0 ? 'Leave!' : timeToLeave + ' min'}</Typography></Grid>
                </Grid>
            );
        }

        function renderFocusedPlaceHolder() {
            const iconDim = 25;
            const fontSize = '1.3rem';
            const fontSizeBig = '6.25rem';

            return (
                <Grid container spacing={1}>
                    <Grid xs={2}></Grid>
                    <Grid xs={'auto'}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={'auto'}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={true}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={2}></Grid>
                    <Grid xs={12} sx={{textAlign: 'center'}}><Skeleton variant="text" sx={{ fontSize: fontSizeBig }} /></Grid>
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
                    <Grid xs={6}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={3}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>

                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={6}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={3}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>

                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={6}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={3}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>

                    <Grid xs={1}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={2}><Skeleton variant="circular" width={iconDim} height={iconDim} /></Grid>
                    <Grid xs={6}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                    <Grid xs={3}><Skeleton variant="text" sx={{ fontSize: fontSize }} /></Grid>
                </Grid>
            );
        }

        return (
            <Grid xs={12} lg={6} xl={4}>
                <Paper elevation={5}>
                    <Box className='block'>
                        <Typography variant='button' component='h3'>{props.route.fromName} &gt; {props.route.toName}</Typography>
                    </Box>

                    <Divider />

                    <Box className='block'>
                        {props.getRoutesPromiseState.data ? (props.route.focused ? props.getRoutesPromiseState.data.Trip.slice(0, 1).map(displayFocusedLineCB) : props.getRoutesPromiseState.data.Trip.slice(0, 4).map(displayLinesCB)) : (props.route.focused ? renderFocusedPlaceHolder() : renderPlaceHolder())}
                    </Box>

                    <Divider />

                    <Box className='block'>
                        <Grid container>
                            <Grid xs={true}>
                                <FormGroup>
                                    <FormControlLabel size='small' control={<Switch onClick={focusSwitchACB} checked={props.route.focused} />} label='Focus' />
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