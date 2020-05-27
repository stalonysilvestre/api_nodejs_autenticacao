const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Conectado com o banco de dados");    
}).catch(err => {
    console.log('Erro ao conectar com o banco de dados', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Api ltp6."});
});

require('./app/routes/note.routes.js')(app);


app.listen(3000, () => {
    console.log("Servidor sendo executado na porta 3000");
});