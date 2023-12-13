import {observer} from 'mobx-react-lite';
import {createHashRouter, RouterProvider} from 'react-router-dom';

import '/src/style.css';
import Test from './testPresenter.jsx';
import AddRoute from './addRoutePresenter.jsx';
import Sidebar from './sidebarPresenter.jsx';
import Location from './locationPresenter.jsx';
import Design from './designPresenter.jsx';

function makeRouter(model) {
    return createHashRouter([
        {
            path: '',
            element: <Location model={model} />
        },
        {
            path: 'addroute',
            element: <AddRoute model={model} />
        },
        {
            path: 'test',
            element: <Test model={model} />
        }
    ]);
}

export default observer(
    function ReactRoot(props) {
        if (1) {
            return (<Design model={props.model} />);
        }
        if (!props.model) {
            return (<div>"no data"</div>);
        }
        return (<div className='flexParent'>
                    <div className='sidebar'>
                        <h1><img src='/src/img/logo.png' alt='Leave on Time' width='100%' /></h1>
                        <Sidebar model={props.model} />
                    </div>
                    <div className='mainContent'>
                        <RouterProvider router={makeRouter(props.model)}/>
                    </div>
                </div>);
    }
);