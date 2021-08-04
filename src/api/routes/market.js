const express = require('express');
const marketController = require('../controller/marketController');
const router = express.Router();

router.get('/items', async (req, res) => { 
    const result = await marketController.getAllItems();
    res.json(result);
    res.status(200);
});

router.get('/items/:id', async (req, res) => {
    await marketController.getItem(req, res);
});

router.post('/items', async (req, res) => {
    await marketController.createItem(req, res);
});

router.delete('/items/:id', async (req, res) => {
    await marketController.deleteItem(req, res);
});

// router.patch('/items/:id', async (req, res) => {
//     const verificationApiKey = verifyApiKey(req);
//     if(verificationApiKey){
//         res.status(verificationApiKey.status).send(verificationApiKey.message);
//     }else{
//         const { id } = req.params;
//         const { body } = req
//         if(idVerification(id)){
//             res.status(409).json(idVerification(id));
//         }else{
//             const result = await marketController.updateItem(id, body);
//             res.status(200).json(result);
//         };
//     };
// });


module.exports = router;