const express = require('express');
const router = express.Router();


router.get('/cart/items', (req, res) => {
    res.end('test');
});

router.get('/cart/items/:id', (req, res) => {

});

router.post('/cart/items', (req, resp) => {

});

router.delete('/cart/items/:id', (req, res) => {

});

router.patch('/cart/items/:id', (req, res) => {

});


module.exports = router;