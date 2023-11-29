//import Summary from "./summaryPresenter.jsx";
//import Sidebar from "./sidebarPresenter.jsx";
//import SearchForm from "./searchFormPresenter.jsx";
import Test from "./testPresenter.jsx";

export default
//observer(     //will be added in week 3
function ReactRoot(props){
    console.log("hej")
    return (<div>
       
       
        <div><Test model={props.model} /></div>

    </div>
   );
}
//)
