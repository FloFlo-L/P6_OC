const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId : {type: String, require: true},
    name : {type: String, require: true},
    manufacturer : {type: String, require: true},
    description : {type: String, require: true},
    imageUrl : {type: String, require: true},
    mainpepper : {type: String, require: true},
    heat : {type: Number, require: true},
    like : {type: Number, default: 0},
    dislike : {type: Number, default: 0},
    usersLiked : {type: [String]},
    usersDisliked : {type: [String]}
}) 

module.exports = mongoose.model('Sauce', sauceSchema);