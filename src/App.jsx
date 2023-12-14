import {observer} from 'mobx-react-lite';
import {createHashRouter, RouterProvider} from 'react-router-dom';

import '/src/style.css';
import AddRoute from '/src/presenters/addRoutePresenter.jsx';
import Sidebar from '/src/presenters/sidebarPresenter.jsx';
import Location from '/src/presenters/locationPresenter.jsx';
import EditRoute from '/src/presenters/editRoutePresenter.jsx';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default observer (
    function App(props) {
        const router = createHashRouter([
            {
                path: '',
                element: <Location model={props.model} />
            },
            {
                path: 'addroute',
                element: <AddRoute model={props.model} />
            },
            {
                path: 'editroute',
                element: <EditRoute model={props.model} />
            }
        ]);

        if (!props.model) {
            return (<div>"no data"</div>);
        }

        return (
            <Box sx={{flexGrow: 1}}>
                <Grid container>
                    <Sidebar model={props.model} />
                    <RouterProvider router={router}/>
                </Grid>
            </Box>
        );
    }
);