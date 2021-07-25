const express = require('express');
const router = express.Router();


router.get('/market/items', (req, res) => {
    res.end('test2');
});

router.get('/market/items/:id', (req, res) => {

});

router.post('/market/items', (req, resp) => {

});

router.delete('/market/items/:id', (req, res) => {

});

router.patch('/market/items/:id', (req, res) => {

});


module.exports = router;