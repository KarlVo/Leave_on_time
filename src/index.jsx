import {observable, configure} from 'mobx';
import {createRoot} from 'react-dom/client';

import connectToFirebase from '/src/firebaseModel.js';
import model from '/src/model/CommuteModel.js';
import App from '/src/App.jsx';

const reactiveModel = observable(model);

configure({enforceActions: 'never'});

connectToFirebase(reactiveModel);

createRoot(document.getElementById('root')).render(<App model={reactiveModel}/>);

window.myModel = reactiveModel; // !Remove this line before deploying!