//author: Ricardo J. Perez Torres
//description: 

var MongoClient = require('mongodb').MongoClient;
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const $ = require('jquery');

//mongodb atlas cluster url
//url = "mongodb://zeroth:P455w0rd@ct-cluster-shard-00-00-y9kdv.mongodb.net:27017,ct-cluster-shard-00-01-y9kdv.mongodb.net:27017,ct-cluster-shard-00-02-y9kdv.mongodb.net:27017/test?ssl=true&replicaSet=CT-Cluster-shard-0&authSource=admin";
var url = "mongodb://mongodb-thezeroth.c9users.io:27017/test";

//Connect to mongodb atlas cluster
MongoClient.connect(url, (err, db)=>{
    if(err) throw err;
    console.log('DB connected');

    // db.collection('costumers').drop((err, delOK)=>{
    //     if (err) throw err;
    //     if(delOK) console.log("deleted");
    // });

    // db.createCollection('costumers', (err, res)=>{
    //     if(err) throw err;
    //     console.log("Costumers Collection Created");
    // });

    $('#btnSend').click((e)=>{
        e.preventDefault();
        let data = {
            firstname: $('#txtNombre').val(),
            lastname: $('#txtApellido').val(),
            user_id: $('#txtId').val(),
            phone: $('#txtPhone').val()
        }
        db.collection('costumers').insertOne(data, (err, res)=>{
            if(err) throw err;
            console.log('Inserted.');
            $('#costumer').trigger('reset');
            console.log(res);
        });
    });

    setInterval(()=>{
        db.collection('costumers').find({}).toArray((err, result)=>{
            console.log(result);
            $('#content').empty();
            result.forEach(function(element) {
                $('#content').append("<h3>"+ element.firstname + " " + element.lastname + "</h3>");
            }, this);
        });
    }, 5000); 
});

$('#btnSearch').click((e)=>{
    e.preventDefault();
    ipcRenderer.send('btnSearchClick');
});

var app = new Vue({
    el: '#app',
    data: {
        "links": [
            {
                "title": "Home",
                "href": "#"
            },
            {
                "title": "Menu",
                "href": "#"
            },
            {
                "title": "Movies",
                "href": "#"
            }
        ]
    }
});