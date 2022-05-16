const sauceModel = require('../models/sauce');//importer model shema sauce
const fs = require('fs');//file system, permet d'avoir accès à tout les opérations liés au FS

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new sauceModel({
       ...sauceObject,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
       like: 0,
       dislike: 0,
    //    usersLiked: [' '],
    //    usersdisLiked: [' '],
       // req.protocol pour obtenir le premier segment (dans notre cas 'http' ).
       // req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000' ).
       // '/images/' et le nom de fichier pour compléter notre URL.
    });
    sauce.save()//enregistre la sauce dans la BD, save() renvoie une Promise
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
    sauceModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//utilisons aussi le paramètre id passé dans la demande, et le remplaçons par le Thing passé comme second argument
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
        console.log('Modif fait');
};

exports.deleteSauce = (req, res, next) => {
    sauceModel.findOne({ _id: req.params.id })
      .then(sauce=> {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {//supprimer fichier
          sauceModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneSauce = (req, res, next) => {
    sauceModel.findOne({ _id: req.params.id })//méthode findOne() dans notre modèle sauce pour trouver le sauce unique ayant le même _id que le paramètre de la requête
        .then(sauce => res.status(200).json(sauce))//ceette sauce est ensuite retourné dans une Promise et envoyé au front-end
        .catch(error => res.status(404).json({ error }));//si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
        console.log('Une Sauce')
};

exports.getAllSauce = (req, res, next) => {
    sauceModel.find()//renvoyer un tableau contenant tous les Things dans notre base de données.
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
        console.log('Liste Sauce');
};

exports.likeSauce = (req, res, next) => {

    switch (req.body.like) {
        case 1 :
            sauceModel.updateOne(
                { _id: req.params.id },
                { $push: {  usersLiked: req.body.userId  },//https://www.mongodb.com/docs/manual/reference/operator/update/push/
                $inc: { like: +1 }})//https://www.mongodb.com/docs/manual/reference/operator/update/inc/
            .then(() => res.status(200).json({ message: 'Sauce likée !' }))
            .catch((error) => res.status(400).json({ error }))
        break;

        case 0 :
            sauceModel.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) { 
                sauceModel.updateOne(
                    { _id: req.params.id},
                    { $pull: { usersLiked: req.body.userId },//https://www.mongodb.com/docs/manual/reference/operator/update/pull/
                    $inc: { like: -1 }})
                .then(() => res.status(200).json({ message: `Like non selectionné` }))
                .catch((error) => res.status(400).json({ error }))
                }
                if (sauce.usersDisliked.includes(req.body.userId)) { 
                sauceModel.updateOne(
                    { _id: req.params.id },
                    { $pull: { usersDisliked: req.body.userId },
                    $inc: { dislike: -1 }})
                .then(() => res.status(200).json({ message: `Dislike non selectionné` }))
                .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(404).json({ error }))
        break;

        case -1 :
            sauceModel.updateOne(
                { _id: req.params.id },
                { $push: {  usersDisliked: req.body.userId  },
                $inc: { dislike: +1 }})
            .then(() => res.status(200).json({ message: 'Sauce dislikée !' }))
            .catch((error) => res.status(400).json({ error }))
        break;


        default:
        console.log(error);

    }
}