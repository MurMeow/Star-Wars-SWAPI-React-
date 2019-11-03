import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import reactDom from "react-dom";
import Index from './index'




const appElement = document.getElementById('app');

reactDom.render(
		<Index />,
	appElement);

