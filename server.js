global.WebSocket = require('ws');
const express    = require('express');
const code       = require('./code');
const mqtt       = require('./mqtt')

/* SETUP */
const app = express();         
const api = express.Router();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* ROUTES */ 
api.get('/atuador', (req, res) => { 
    var id = req.query.id;
    code.buscarAtuadores((result) => {          
        res.json(result);
    }, id);
});

api.get('/sensor', (req, res) => { 
    var id = req.query.id;
    code.buscarSensores((result) => {          
        res.json(result);
    }, id);
});

/* STARTUP */
app.use('/', api);
app.listen(port);
mqtt.listen();