import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";

function App() {
	// useState that retrieves 2 things:
	//animals= to access the value
	//setAnimals to update "animals" value, so the AnimalCard can show them
	const [animals, setAnimals] = useState([]);

	//this useEffect is for loading the data ONCE, for optimization purposes
	//the first thing is the function i want to execute
	//the second thing is the dependencies that have to change to actually trigger the function and update (if this is an empty array, react will load it the first time and nothing more)
	useEffect(() => {
		async function go() {
			//Axios is better to GET things from the database
			const response = await Axios.get("api/animals");
			//and use setAnimals to update animals with whatever the server gets back to us
			setAnimals(response.data);
		}
		go()
	}, []);
	//so the useEffect executes once and gets the data to update animals

	return (
		<div>
			<h1>Hello</h1>
			<p>Hey, this is from React.</p>
			{animals.map(function (animal) {
				return <AnimalCard name={animal.name} species={animal.species} />;
			})}
		</div>
	);
}

function AnimalCard(props) {
	return (
		<p>
			Hi, my name is {props.name} and im a {props.species}{" "}
		</p>
	);
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
