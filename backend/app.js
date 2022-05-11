const express = require('express');//importer express
const mongoose = require('mongoose');//importer mongoose

const userRoutes = require('./routes/user')

const app = express();//appeler méthode express pour créer une application

//Express prend toutes les requêtes qui ont comme Content-Type  application/json
// et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

mongoose.connect('mongodb+srv://Florian123:098POI@cluster0.s012r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);

module.exports = app;//exporter application