import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Axios from "axios";
import CreateNewForm from "./components/createNewForm";
import AnimalCard from "./components/AnimalCard";

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
		go();
	}, []);
	//so the useEffect executes once and gets the data to update animals

	return (
		<div className="container">
			<p>
				<a href="/">&laquo; Back to public homepage</a>
			</p>

			<CreateNewForm setAnimals={setAnimals} />

			<div className="animal-grid">
				{animals.map(function (animal) {
					return <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal.id} setAnimal={setAnimals} />;
				})}
			</div>
		</div>
	);
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
