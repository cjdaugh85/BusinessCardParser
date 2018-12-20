const mongoose = require('mongoose');
const connectUrl = 'mongodb://localhost:27017/local';

mongoose.connect(connectUrl, {useNewUrlParser:true}).then(() => {
    console.log(`Connected to MongoDB`);
}).catch((err) => {
    console.error(`ERROR: Error Connecting to MongoDB ${err}`);
});

module.exports = mongoose;