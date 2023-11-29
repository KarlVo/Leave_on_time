import model from '/src/CommuteModel.js'; 

console.log("hejhej");

import { observable, configure } from 'mobx';
configure({enforceActions:"never",});

const reactiveModel = observable(model);

import {createElement} from "react";
window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue

import {createRoot} from "react-dom/client";
import ReactRoot from "./reactjs/ReactRoot.jsx";    //här hämtar jag ReactRoot funktionen i ReactRoot filen

createRoot(document.getElementById('root'))
    .render(<ReactRoot model={reactiveModel}/>);  // mounts the app in the page DIV with the id "root"
// to see the DIV, look at react.html in the developer tools Sources
// react.html, with the content <div id="root"></div> is configured in vite.config.js


// ------ for debug purposes ----------
window.myModel= model;             // make the model available in the Console
window.myModel= reactiveModel;  


