const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// ENV Variables
require('dotenv').config()

// user
const User = require('./Routes/Users');
const { useInsertionEffect } = require('react');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect To DB
const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    database: process.env.DBDATABASE
})

con.connect(function(err){
    if(err) throw err;
});

// this func allow users to visit this path
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'react')));

// api
// app.use('/api/users', Users);

// port
const port = process.env.PORT || 4000;

// run the server
app.listen(port, () => console.log(`app listen on port ${port}`));


