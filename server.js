const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');


const pages = __dirname+'/app/pages/';

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to RPS application."});
});

app.get('/home', function(req, res) {
 
    res.sendFile(path.join(pages + 'index.html'));
});

app.get('/selRps', function(req, res) {
    
    res.sendFile(path.join(pages + 'selectrps.html'));
});

app.get('/result', function(req, res) {
    let playerType = '';
    let moveType ='';
    let status = '';
    http.get('http://localhost:8082/play?moveType=PAPER&playerType=COMPUTER',(resp) => {

          let data = '';
          // parsed response body as js object
          resp.on('data', (chunk) => {
            data += chunk;
          });
        
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(JSON.parse(data));
            playerType = data.playerType;
            moveType = data.moveType;
            status = data.status;
          });
    });
    res.sendFile(path.join(pages + 'result.html'),playerType,moveType,status);
});

require('./app/routes/rps.routes.js')(app);
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});