const mongoose = require('mongoose');
const { Market } = require('../../models/marketModels.js');
const { verifyUserAdmin } = require('../../services/verifyUserStatus.js');
const idVerification = require('../../services/verifyLengthId.js');

module.exports = {
    createItem: async (req, res) => {

        const { name, img, price, wheightPrice } = req.body;
        const token = req.get('token');

        if(!await verifyUserAdmin(token)){
            return res.status(403).json({type: "error", message: "Sorry you can't do this"});
        }

        const item = new Market({
            _id: mongoose.Types.ObjectId(),
            name: name,
            img: img, 
            price: price,
            wheightPrice: wheightPrice
        });
        const newItemEntry = await item.save();
        return res.status(201).json(newItemEntry);
        
    },
    getAllItems: async () => {
        const result =  await Market.find({}, (err, items) => {
             if(err){ return err }; 
             return items;
        });
        return result;
    },
    getItem: async (req, res) => {
        const { id } = req.params; 
        idVerified = idVerification(id);
        if(idVerified){
            return res.status(409).json(idVerified.message)
        }
        const result = await Market.findById(id, (err, item) => { 
            if(err){ return err };
            return item; 
        });
        return res.status(200).json(result);
    },
    deleteItem: async (req, res) => {
        const { id } = req.params;
        const token = req.get('token');

        if(!await verifyUserAdmin(token)){
            return res.status(403).json({type: "error", message: "Sorry you can't do this"});
        }

        const result = await Market.findByIdAndDelete(id, (err, item) => {
            if(err){ return err};
            return item;
        });
        return res.status(200).json(result);
    },
    updateItem: async (id, body) => {
        const result = await Market.findByIdAndUpdate(id, body, (err, item) => {
            if(err){ return err};
            return item;
        });
        return result;
    }
};