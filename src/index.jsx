import React from 'react';
import Reactdom from 'react-dom';
import App from './app.jsx';

Reactdom.render( <App port={io.connect('http://localhost:3000')} />, document.getElementById('app'));