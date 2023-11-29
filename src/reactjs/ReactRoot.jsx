import Summary from "./summaryPresenter.jsx";
import Sidebar from "./sidebarPresenter.jsx";
import SearchForm from "./searchFormPresenter.jsx";


export default
//observer(     //will be added in week 3
function ReactRoot(props){
    return (<div>
       

        <div><Sidebar model={props.model} /></div>

  

    <div>
        {/* TODO TW1.5 Sidebar will be added here, inside a DIV, like Summary below */}
        <Search model={props.model} />
        <Details model={props.model} />
        <Summary model={props.model} />
        
    </div>
    </div>
   );
}
//)
