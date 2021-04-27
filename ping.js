const mysql = require('mysql');
const conf = require('./conf.json');
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var connection = mysql.createConnection(conf[process.env.NODE_ENV].db);

/* connection.ping(function(err) {
    if (err) throw err ;
    else {
        console.log("pong");
        connection.end();
    }
}); */

// promisifying ping

/* new Promise(function(resolve) {
    connection.ping(function(err) {
        if (err) console.error(err) ;
        else resolve("pong");
    }); 
}).then(r => {
    console.log(r); 
    connection.end();
}); */

connection.end();

/* new Promise(function(resolve, reject) {
    connection.ping(function(err) {
        if (err) reject(err) ;
        else resolve("pong");
    }); 
}).then(r => {
    console.log(r); 
    connection.end();
}, console.error); */

function ping() {
    return new Promise(function(resolve, reject) {
        connection.ping(function(err) {
            if (err) reject(err) ;
            else resolve("pong");
        }); 
    });
}

async function pong() {
    try { 
        var p = await ping();
        console.log(p); 
        connection.end();
    } catch (err) { console.error(err); }
}

pong();