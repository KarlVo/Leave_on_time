//import Summary from "./summaryPresenter.jsx";
//import Sidebar from "./sidebarPresenter.jsx";
//import SearchForm from "./searchFormPresenter.jsx";
import test from "./testPresenter.jsx";

export default
//observer(     //will be added in week 3
function ReactRoot(props){
    return (<div>
       

        <div><test model={props.model} /></div>

    </div>
   );
}
//)
