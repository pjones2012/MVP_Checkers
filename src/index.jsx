import React from 'react';
import Reactdom from 'react-dom';
import App from './app.jsx';
//old host? http://18.216.162.138:80
Reactdom.render( <App port={io.connect('http://localhost:3000')} />, document.getElementById('app'));