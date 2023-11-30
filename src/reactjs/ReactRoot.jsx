//import Summary from "./summaryPresenter.jsx";
//import Sidebar from "./sidebarPresenter.jsx";
//import SearchForm from "./searchFormPresenter.jsx";
import Test from "./testPresenter.jsx";

export default
//observer(     //will be added in week 3
function ReactRoot(props){
    console.log("hej")
    return (<div className="flexParent">
                <div className="sidebar">
                    <h1><img src="/src/img/logo.png" alt="Leave on Time" width="100%" /></h1>

                    <div>Misc. Sidebar Content. Buttons? Forms? Navigation?</div>
                    Exempel på loader i det här fältet:
                    <div className="progress white"></div>
                </div>
                <div className="mainContent">
                    <Test model={props.model} />
                    
                    <hr></hr>
                    Exempel på loader i det här fältet:
                    <div className="progress"></div>
                </div>
            </div>);
}
//)
