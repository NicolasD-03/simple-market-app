const express = require('express');
const marketController = require('../controller/marketController');
const router = express.Router();

router.get('/items', async (req, res) => { 
    res.status(200).json(await marketController.getAllItems());
});

router.get('/items/:name', async (req, res) => {
    const {name} = req.params;
    res.json(await marketController.getItem(name));
    res.status(200);
    
});

router.post('/items', async (req, res) => {
    const { name, img, price, wheightPrice } = req.body;
    res.json(await marketController.createItem(name, img, price, wheightPrice));
    res.status(201);
    
});

router.delete('/items/:name', async (req, res) => {
    const {name} = req.params;
    res.json(await marketController.deleteitem(name));
    res.status(200);
});

router.patch('/items/:name', (req, res) => {

});


module.exports = router;