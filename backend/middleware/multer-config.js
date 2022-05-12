const multer = require('multer');//package multer gestion de fichiers

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({//diskStorage configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {
    callback(null, 'images');// fct destination indique à multer d'enregistrer les fichiers dans le dossier images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores 
    const extension = MIME_TYPES[file.mimetype];//dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
    callback(null, name + Date.now() + '.' + extension);//ajouter un timestamp Date.now() comme nom de fichier.
  }
});

module.exports = multer({storage: storage}).single('image');
//Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage
//et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.