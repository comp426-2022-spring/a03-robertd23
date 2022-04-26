// Require Express.js
const express = require('express')
const app = express()

const args = require("minimist")(process.argv.slice(2));
args["port"];
HTTP_PORT = args.port || 5000;


function coinFlip() {
    let x = Math.floor(Math.random()*2)
    if (x>=1) {
      return 'heads';
    }
    else {
      return 'tails';
    }
}
function coinFlips(flips) {
    var out = [];
    if (flips == 0) {
      return
    }
    for (let i = 0; i < flips; i++) {
      out[i] = (coinFlip());
    }
    return out
}

function countFlips(array) {
    var headss = 0;
    var tailss = 0;
    for (let i = 0; i<array.length; i++) {
      if (array[i] == "heads") {
        headss++
      }
    }
    for (let i = 0; i<array.length; i++) {  // for code simplification and later testing, I spereated the for loops
      if (array[i] == "tails") {
        tailss++
      }
     }
  
     if (headss > 0 && tailss == 0) {
       return {heads: headss}
     }
     else if (tailss > 0 && headss == 0) {
      return {tails: tailss}
    } else {
      return {heads: headss, tails: tailss}
    }
     
}  
function flipACoin(call) {
    var coin = coinFlip();
    let outcome = '';
    if (call == coin) {
      outcome='win';
    }
    else {
      outcome = 'lose';
    }
    return {call: call, flip: coin, result: outcome}
}







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

app.get('/app/flip/', (req, res) => {
	val = coinFlip()
    res.status(200).json({"flip": val})
});
app.get('/app/flips/:number', (req, res) => {
    let flipper = coinFlips(req.params.number);
    let counter = countFlips(flipper);
    res.status(200).json({"raw": flipper, "summary" : counter})
});
//app.get('/app/flips/call/heads', (req, res) => {
//    var val = flipACoin('heads');
//    res.stat(200).json(val)
//});
//app.get('/app/flips/call/tails', (req, res) => {
//    var val = flipACoin('tails');
//    res.stat(200).json(val)
//});

app.get('/app/flip/call/:hort', (req, res) => {
    let flippest = flipACoin(req.params.hort);
    res.status(200).json(flippest);
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});