const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    link: String,
    sessionId: String,
    message: [Object]
});
  
  
module.exports = mongoose.model('Secretmessage', userSchema);