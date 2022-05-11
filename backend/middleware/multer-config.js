const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');//appeler callback avec nom dossier 
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');// nom original du fichier et supprimer espace et remplacer _
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);//timestamp
  }
});

module.exports = multer({storage: storage}).single('image');