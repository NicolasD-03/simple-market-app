const express = require('express');
const marketController = require('../controller/marketController');
const idVerification = require('../../services/verifyLengthId.js');
const verifyApiKey = require ('../../services/verifyApiKey.js');
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
    const verificationApiKey = verifyApiKey(req);
    if(verificationApiKey){
        res.status(verificationApiKey.status).send(verificationApiKey.message);
    }else{
        const { name, img, price, wheightPrice } = req.body;
        const newEntry = await marketController.createItem(name, img, price, wheightPrice);
        if(newEntry.errors){
            res.status(400).json(newEntry);
        }else{
            res.status(201).json(newEntry);
        };
    };
});

router.delete('/items/:id', async (req, res) => {
    const verificationApiKey = verifyApiKey(req);
    if(verificationApiKey){
        res.status(verificationApiKey.status).send(verificationApiKey.message);
    }else{
        const { id } = req.params;
        if(idVerification(id)){
        res.json(idVerification(id));
        res.status(409);
        }else{
        const result = await marketController.deleteItem(id);
        res.json(result);
        res.status(200);
        };
    };
});

router.patch('/items/:id', async (req, res) => {
    const verificationApiKey = verifyApiKey(req);
    if(verificationApiKey){
        res.status(verificationApiKey.status).send(verificationApiKey.message);
    }else{
        const { id } = req.params;
        const { body } = req
        if(idVerification(id)){
            res.status(409).json(idVerification(id));
        }else{
            const result = await marketController.updateItem(id, body);
            res.status(200).json(result);
        };
    };
});


module.exports = router;