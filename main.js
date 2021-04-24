// Access from browser with http://localhost:8080/

const express = require('express');
const mysql = require('mysql');
const conf = require('./conf.json');
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const QUERY1 = "SELECT * FROM `public-bike-pumps`";
const QUERY2 = "SELECT * FROM `public-bike-pumps` Where Type = ?";
const QUERY3 = "SELECT * FROM `public-bike-pumps` Where Name LIKE ?";

var app = express();

// configure Express to use embedded JavaScript
app.set("view engine", "ejs");

// serve static content from 'static' folder
app.use(express.static('static'));

// callback function for the splash page request handler
function splash(request, response) {
    // if no type is specified use QUERY1
    if (typeof request.query.type == 'undefined') {
        connection.query(QUERY1, function (err, rows, fields) {
            if (err) {
                response.status(500);
                response.send(err);
            }
            response.render("index", { 'rows': rows });
        });
    }
    else { // QUERY2 selects matching type
        connection.query(QUERY2, [request.query.type], function (err, rows, fields) {
            if (err) {
                response.status(500);
                response.send(err);
            }
            response.render("index", { 'rows': rows, "type": request.query.type });
        });
    }
}

// Splash page (index.html) is served by default
app.get("/", splash);
app.get("/index.html", splash);

app.get("/map.html", function (request, response) {
    var lat = request.query.lat, lon = request.query.lon;
    if (typeof request.query.type == 'undefined') {
        connection.query(QUERY1, function (err, rows, fields) {
            if (err) {
                response.status(500);
                response.send(err);
            }
            else {
                response.render("map", { 'rows': rows, 'lat':lat, 'lon':lon });
            }
        });
    }
    else {
        connection.query(QUERY2, [request.query.type], function (err, rows, fields) {
            if (err) {
                response.status(500);
                response.send(err);
            }
            else {
                response.render("map", { 'rows': rows, "type": request.query.type, 'lat':lat, 'lon':lon });
            }
        });
    }
});

app.get("/search.html", function (request, response) {
    connection.query(QUERY3, ["%" + request.query.search + "%"], function (err, rows, fields) {
        if (err) {
            response.status(500);
            response.send(err);
        }
        response.render("search", { 'rows': rows });
    });
});

var connection = mysql.createConnection(conf[process.env.NODE_ENV].db);

connection.connect(function (err) {
    if (err) {
        console.error("Connection error: ", err.message);
    } else {
        console.log("Connected as: ", connection.threadId);
    }
});

app.listen(conf[process.env.NODE_ENV].port);
console.log("Listening on port %s", conf[process.env.NODE_ENV].port);