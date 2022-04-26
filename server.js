// Require Express.js
const express = require('express')
const app = express()

const args = require("minimist")(process.argv.slice(2));
args["port"];


HTTP_PORT = args.port || 5000;
// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});


app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flips/', (req, res) => {
	//Some
	//expressions
	//go
	//here
});
app.get('/app/flips/:number', (req, res) => {
	//Some
	//expressions
	//go
	//here
});
app.get('/app/flips/call/heads', (req, res) => {
	//Some
	//expressions
	//go
	//here
});
app.get('/app/flips/call/tails', (req, res) => {
	//Some
	//expressions
	//go
	//here
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});