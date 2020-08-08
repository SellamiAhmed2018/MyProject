import React from 'react';
import Header from "./Components/Header.jsx";
import Content from "./Components/Content.jsx";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {

	return(
		<React.Fragment>
			<Header />
			<Content />
		</React.Fragment>
	)

}


export default App;
