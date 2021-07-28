const express = require('express');
const morgan = require('morgan');

const user  = require('./api/routes/user.js');
const market = require('./api/routes/market.js');
const config = require('./config/index.js');
const db = require('./config/init.js');
const app = express();

const port = config.port || 8080;
const host = config.hostname || "localhost";
const apiAdress =  config.apiAdress;

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

app.use((`${ apiAdress }users`), user);
app.use((`${ apiAdress }market`), market);


app.listen(port, host, () => {
    console.log(`Server start at http://${ host }:${ port }`);
});