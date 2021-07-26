const express = require('express');
const router = express.Router();


router.get('/items', (req, res) => {
    res.end('test');
});

router.get('/:id', (req, res) => {

});

router.post('/items', (req, res) => {
    
});

router.delete('/:id', (req, res) => {

});

router.patch('/:id', (req, res) => {

});


module.exports = router;