const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;


const marketShema = new Schema ({
    _id: ObjectId,
    name: {type: String, required: true},
    img: String,
    price: Number,
    wheightPrice: Number
},{
    versionKey: false
});

marketShema.index({name: 1})

const Market = mongoose.model('Market', marketShema);

module.exports =  { Market };