const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le MDP doit contenir minimum 8 caractères, avec une maj, une min et un chiffre.' });
    } else {
        next();
    }
};