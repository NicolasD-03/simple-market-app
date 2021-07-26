const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;


const marketShema = new Schema ({
    _id: ObjectId,
    name: {
        type: String, 
        required: true
    },
    img: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    wheightPrice: {
        type: Number, 
        required: true
    }
},{
    versionKey: false
});

const Market = mongoose.model('Market', marketShema);

module.exports =  { Market };