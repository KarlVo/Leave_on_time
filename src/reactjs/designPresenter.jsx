import { observer } from 'mobx-react-lite';
import DesignView from '../views/designView.jsx';

export default observer (
    function Design(props) {
        return (<DesignView
                    someprop={props.model.currentLocation}
                />);
    }
);