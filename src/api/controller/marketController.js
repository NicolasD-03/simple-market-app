const mongoose = require('mongoose');
const { Market } = require(`${ process.cwd() }/src/models/marketModels.js`);

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
            throw error;
        }
        
    },
    getAllItems: async () => {
        try{
            const result = await Market.find({}, (err, items) => { items })
            return result;
        }catch(error){
            throw error;
        }
    },
    getItem: async (name) => {
        try{
            const result = await Market.findOne({name: name}, (err, item) => { item });
            return result;
        }catch(error){
            throw error;
        }
    },
    deleteitem: async (name) => {
        try{
            const result = await Market.findOneAndDelete({name: name});
        }catch(error){ 
            throw error;
        }
    }
}