const express = require('express');//importer express
const mongoose = require('mongoose');//importer mongoose
const helmet = require('helmet');
const path = require('path');


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();//appeler méthode express pour créer une application

// app.use(helmet());
https://helmetjs.github.io/ https://connect.ed-diamond.com/MISC/misc-101/vos-entetes-https-avec-helmet

mongoose.connect('mongodb+srv://Florian123:098POI@cluster0.s012r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',//lien mongoDB
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//Autorise l'accès à l'API pour n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Définit les Headers utilisé par l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//méthodes possible à utiliser
    next();
});

//Express prend toutes les requêtes qui ont comme Content-Type  application/json
// et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;//exporter application