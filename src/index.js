import React from "react";
import { createRoot } from "react-dom/client";

function App() {
	alert("AmblueAbbaDeeAbbaDae");
	return (
		<div>
			<h1>Hello</h1>
			<p>Hey, this is from React.</p>
		</div>
	);
}

function AnimalCard(props){
	return(
		<p>Hi, my name is {props.name} and im a dog {props.species} </p>
	)
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
