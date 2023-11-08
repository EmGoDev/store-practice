const { MongoClient } = require("mongodb");
const express = require("express");
let db; // only to initialize it and use it on start() function

// this is an instance of the imported express
const app = express();
//we are gonna use ejs for generating HTML markup using Javascript
app.set("view engine", "ejs");
// dis is the folder of the HYML from ejs
app.set("views", "./views"); 
// dis is the folder of java files to code in react
app.use(express.static("public")); 

function passwordProtecc (req, res, next) {
	res.set("WWW-Authenticate", "Basic realm='Our MERN App")
	//this is the combo for user admin pass admin
	if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
		next()
	} else {
		console.log(req.headers.authorization)
		res.status(401).send("Try Again")
	}
}

// route for the root page
app.get("/", async (req, res) => {
	//find everything inside the collection animals and put it in an array and show it in the console
	//.toArray() is for the output format to be understandable for us, humans
	const allAnimals = await db.collection("animals").find().toArray();
	console.log(allAnimals);
	// render the HTML inside home.ejs, and take allAnimals with you :D.
	res.render("home", { allAnimals });
});

//after the base route, all the other ones will have password
app.use(passwordProtecc)

// route for the admin page
app.get("/admin", (req, res) => {
	res.render("admin");
});

// route for the RAW DATA
app.get("/api/animals", async (req, res) => {
	const allAnimals = await db.collection("animals").find().toArray();
	res.json(allAnimals)
});



// foce DB connection before someone visits our server
async function start() {
	const client = new MongoClient(
		"mongodb+srv://user:AMBLUEABBADEEABBADAAE@cluster0.oxnwe.mongodb.net/AbbaDeeAbbaDae?&authSource=admin"
	);
	await client.connect();
	//the next lines of code will wait until the await line is done
	db = client.db(); //i select the root database of this AbbaDeeAbbaDae Branch

	app.listen(4230, () => {
		console.log(
			"\nThe server is running at port 42300\nPress CTRL + C to end the server"
		);
	});
}
start();
