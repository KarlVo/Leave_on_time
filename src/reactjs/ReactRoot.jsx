//import Summary from "./summaryPresenter.jsx";
//import Sidebar from "./sidebarPresenter.jsx";
//import SearchForm from "./searchFormPresenter.jsx";
import Test from "./testPresenter.jsx";
import AddRoute from "./addRoutePresenter.jsx";
import Sidebar from "./sidebarPresenter.jsx";
import Location from "./locationPresenter.jsx";
import { observer } from 'mobx-react-lite';
import { createHashRouter, RouterProvider } from "react-router-dom";

function makeRouter(model){
    return createHashRouter([
        {
            path: "",
            element: <Location model={model} />
        },
        {
            path: "addroute",
            element: <AddRoute model={model} />
        },
        {
            path: "/test",
            element: <Test model={model} />
        }
    ]);
}

export default
observer(
// <div className="progress white"></div>
// <div className="progress"></div>

    function ReactRoot(props){
        console.log("hej")
        if (!props.model) {
            return "no data";
        }
        return (<div className="flexParent">
                    <div className="sidebar">
                        <h1><img src="/src/img/logo.png" alt="Leave on Time" width="100%" /></h1>
                        <Sidebar model={props.model} />
                    </div>
                    <div className="mainContent">
                        <RouterProvider router={makeRouter(props.model)}/>
                    </div>
                </div>);
    }
);