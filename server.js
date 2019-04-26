var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbname = 'test';
var url = 'mongodb://localhost:27017/' + dbname;
var Message = mongoose.model('Message', {
    msg: String
});


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
 });

app.get('/api/message', GetMesages); 

app.post('/api/message', (req, res) => {
    console.log(req.body);
    var message = new Message(req.body);
    message.save();
    res.status(200);
});

app.post('/auth/register', (req, res) => {
    console.log(req.body);
});


function GetMesages(req, res) {
    Message.find({}).exec((err, result) => {
        res.send(result);
    });
}

mongoose.connect(url, (err, db) =>{
    if (err) {
        return console.log('Error: ' + err);
    }
    console.log('Connected to database:' + dbname);
});

var server = app.listen(port, () => {
console.log('server is listening on %s', port);
});

