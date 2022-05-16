const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : {type: String, require: true},
    name : {type: String, require: true},
    manufacturer : {type: String, require: true},
    description : {type: String, require: true},
    imageUrl : {type: String, require: true},
    mainpepper : {type: String, require: true},
    heat : {type: Number, require: true},
    like : {type: Number, require: true},
    dislike : {type: Number, require: true},
    usersLiked : {type: [String], require: true},
    usersDisliked : {type: [String], require: true}
}) 

module.exports = mongoose.model('Sauce', sauceSchema);