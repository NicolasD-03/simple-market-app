const express = require('express');
const morgan = require('morgan');

const cart = require('./routes/cart.js');
const market = require('./routes/market.js');

const app = express();

const port = 8080;

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cart);
app.use(market);


app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});