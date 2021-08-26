import React from 'react';
import Reactdom from 'react-dom';
import App from './app.jsx';

Reactdom.render( <App port={io.connect('http://18.216.162.138:80')} />, document.getElementById('app'));