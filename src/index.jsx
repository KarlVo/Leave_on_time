import {observable, configure} from 'mobx';
import {createRoot} from 'react-dom/client';

import model from '/src/CommuteModel.js';
import ReactRoot from './reactjs/ReactRoot.jsx';

configure({enforceActions: 'never'});

const reactiveModel = observable(model);
window.myModel= reactiveModel; // For debugging

createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel}/>);