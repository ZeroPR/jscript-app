const MongoClient = require('mongodb').MongoClient;
const $ = require('jquery');

var mongoURL = "mongodb://zeroth:P455w0rd@ct-cluster-shard-00-00-y9kdv.mongodb.net:27017,ct-cluster-shard-00-01-y9kdv.mongodb.net:27017,ct-cluster-shard-00-02-y9kdv.mongodb.net:27017/test?ssl=true&replicaSet=CT-Cluster-shard-0&authSource=admin";

$('#txtSearch').keyup(()=>{
    MongoClient.connect(mongoURL, function(err, db){
        console.log('Db connected! from keyup event!');
        if(err) throw err;
        var search = $('#txtSearch').val();
        db.collection('costumers').find({firstname: search}).toArray((err, result)=>{
            $('#searchResult').empty();
            $('#searchResult').append(result);
            console.log(result);
        });
        db.close();
    });
});

$('#btnSearch').click((e)=>{
    e.preventDefault();
    MongoClient.connect(mongoURL, function(err, db){
        console.log('Db connected! from click event!');
        if(err) throw err;
        var search = $('#txtSearch').val();
        db.collection('costumers').find({name: search}).toArray((err, result)=>{
            $('#searchResult').empty();
            $('#searchResult').append(result[0].name);
            console.log(result);
        });
        db.close();
    });
});