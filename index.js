const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
//anime  js


//Barba
const PORT = process.env.PORT || 4004;
//Json Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
//format view
app.set('view engine','ejs')
//module pour projet
app.get('/projet.js',(req,res)=>{
    res.set('Content-Type','text/Javascript');
    res.sendFile(__dirname+'/views/scripts/projet.js');
})
app.use('/projetDB',express.static("./models/projetDB.js"));
//Flip js
app.use('/Flip',express.static("./views/scripts/Flip.js"));
//Page de lancement
app.use('/',require('./routes/home'));
//Page Skill
app.use('/',require('./routes/skill'));
//Page contact
app.use('/',require('./routes/contact'));
//Page Projet
app.use('/',require('./routes/projet'));
//Mes fichier css
app.use('/styles',express.static('./views/styles'));
//Mes images
app.use('/images',express.static('./views/images'));
//Mes extensions
app.use('/extensions',express.static('./views/extensions'))
//Mes scipt js
app.use('/scripts',express.static('./views/scripts'));

app.listen(PORT,() =>{
    console.log(`Votre portfolio est sur  : http://localhost:${PORT}`)
})
