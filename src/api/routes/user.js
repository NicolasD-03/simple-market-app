const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.post('/register', async (req, res) => { 
   await userController.registerUser(req, res);
});

router.post('/login', async (req, res) => {
    await userController.loginUser(req, res);
});

router.get('/:emailKey', (req, res) => {

});

router.get('/cart', (req, res) => {

});

router.post('/cart', (req, res) => {
    res.end('test');res.end('test');
});

router.delete('/cart', (req, res) => {
    res.end('test');
});

router.patch('/cart', (req, res) => {
    res.end('test');
});


module.exports = router