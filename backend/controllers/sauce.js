const Sauce = require('../models/sauce');//importer model shema sauce

exports.createSauce = (req, res, next) => {
   const sauceObject = JSON.parse(req.body.sauce);
   delete sauceObject._id;
   const sauce = new Sauce({
       ...sauceObject,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       // req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
       // req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ).
       // '/images/' et le nom de fichier pour compléter notre URL.
   });
   sauce.save()//enregistre Thing dans la BD, save() renvoie une Promise
      .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))//réponse de réussite avec code 201
      .catch(error => res.status(400).json({ error }));// réponse de l'erreur aevc code 400
      console.log('Nouvelle Sauce ajoutée');
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//utilisons aussi le paramètre id passé dans la demande, et le remplaçons par le Thing passé comme second argument
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) =>{
    Sauce.deleteOne({ _id: req.params.id })//supprimer 
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
        console.log('Sauce supprimée');
};

exports.getOneSauce = (req, res, next) => {//deux-points ":" en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
    Sauce.findOne({ _id: req.params.id })//méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête
        .then(sauce => res.status(200).json(sauce))//ce Thing est ensuite retourné dans une Promise et envoyé au front-end
        .catch(error => res.status(404).json({ error }));//si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
        console.log('Une Sauce')
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()//renvoyer un tableau contenant tous les Things dans notre base de données.
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
        console.log('Liste Sauce')
};