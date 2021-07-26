const mongoose = require('mongoose');
const { Market } = require('../../models/marketModels.js');

module.exports = {
    createItem: async (name, img, price, wheightPrice) => {
        const item = new Market({
            _id: mongoose.Types.ObjectId(),
            name: name,
            img: img, 
            price: price,
            wheightPrice: wheightPrice
        });
        try{
            const newItemEntry = await item.save();
            return newItemEntry;
        }catch (error){
            return error;
        }
        
    },
    getAllItems: async () => {
        const result =  await Market.find({}, (err, items) => {
             if(err){ return err }; 
             return items;
        });
        return result;
    },
    getItem: async (id) => {
        const result = await Market.findById(id, (err, item) => { 
            if(err){ return err };
            return item; 
        });
        return result;
    },
    deleteItem: async (id) => {
        const result = await Market.findByIdAndDelete(id, (err, item) => {
            if(err){ return err};
            return item;
        });
        return result;
    },
    updateItem: async (id, body) => {
        const result = await Market.findByIdAndUpdate(id, body, (err, item) => {
            if(err){ return err};
            return item;
        });
        return result;
    }
};