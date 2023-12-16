import {observable, configure} from 'mobx';
import {createRoot} from 'react-dom/client';

import model from '/src/model/CommuteModel.js';
import App from '/src/App.jsx';

configure({enforceActions: 'never'});

const reactiveModel = observable(model);

createRoot(document.getElementById('root')).render(<App model={reactiveModel}/>);

window.myModel = reactiveModel; // For debugging