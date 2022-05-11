const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//crypté le mdp
        .then(hash => {
            const user = new User({//create new user
                email: req.body.email,
                password: hash//mdp crypté
            });
            user.save()//enregistré user dans base de données
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {//vérifier si on a récupérer ou non un user grâce au mail
        if (!user) {//si on a pas trouvé de user...erreur
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)//comparé le mdp pour se connecter avec le hash reçu avec le user
          .then(valid => {//comparaison mdp valable 
            if (!valid) {//ou non
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  {userId: user._id},
                  'RANDOM_TOKEN_SECRET',
                  {expiresIn:"24h"}//durée validitée du token
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };