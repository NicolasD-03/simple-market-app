const express = require('express');
const marketController = require('../controller/marketController');
const idVerification = require('../../services/verifyLengthId.js');
const router = express.Router();

router.get('/items', async (req, res) => { 
    const result = await marketController.getAllItems();
    res.json(result);
    res.status(200);
});

router.get('/items/:id', async (req, res) => {
    const { id } = req.params; 
    if(idVerification(id)){
        res.json(idVerification(id));
        res.status(409);
    }else{
        const result = await marketController.getItem(id);
        res.json(result);
        res.status(200);
    }
});

router.post('/items', async (req, res) => {
    const { name, img, price, wheightPrice } = req.body;
    const newEntry = await marketController.createItem(name, img, price, wheightPrice);
    if(newEntry.errors){
        res.json(newEntry);
        res.status(400);
    }else{
        res.json(newEntry);
        res.status(201);
    }  
});

router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    if(idVerification(id)){
        res.json(idVerification(id));
        res.status(409);
    }else{
        const result = await marketController.deleteItem(id);
        res.json(result);
        res.status(200);
    }
});

router.patch('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req
    if(idVerification(id)){
        res.json(idVerification(id));
        res.status(409);
    }else{
        const result = await marketController.updateItem(id, body);
        res.json(result);
        res.status(200);
    }
});


module.exports = router;