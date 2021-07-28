const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.post('/register', async (req, res) => { 
   await userController.registerUser(req, res);
});

router.post('/login', async (req, res) => {
    await userController.loginUser(req, res);
});

router.get('/email/:emailToken', async (req, res) => {
    await userController.verifyEmail(req, res);
});

// router.get('/detail', async (req, res) => {
//     await userController.getUserDetail(req, res);
// });

router.patch('/:userId', async (req, res) => {
    await userController.updateUser(req, res);
});

router.get('/:userId/cart', async (req, res) => {
    await userController.getItemCart(req, res);
});

router.post('/:userId/cart', async (req, res) => {
    await userController.createItemCart(req, res);
});

router.delete('/:userId/cart/:itemId', async (req, res) => {
    await userController.deleteItemCart(req, res);
});

router.patch('/:userId/cart/:itemId', async (req, res) => {
    await userController.updateItemCart(req, res);
});


module.exports = router