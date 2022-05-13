const express = require ('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//créer une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
//liker une sauce
router.post('/:id/like', sauceCtrl.likeSauce);
//modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); 
// récupérer tous les sauces
router.get('/', auth, sauceCtrl.getAllSauce);
// récupérer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);


module.exports = router;