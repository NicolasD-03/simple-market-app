const mongoose = require('mongoose');
const { dbHost, dbPort, dbName } = require('./index.js');

mongoose.connect(`${ dbHost }:${ dbPort }/${ dbName }`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

